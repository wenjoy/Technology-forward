import { Alert } from 'react-native';
import UUIDGenerator from 'react-native-uuid-generator';
import {
  select, put, call, delay,
} from 'redux-saga/effects';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import {
  getSessionComplete,
  getSessionFailed,
  saveCreditCardSuccess,
  saveCreditCardError,
  saveCreditCardFailed,
  clearCreditCardInfo,
} from '../actions/creditCard';
import {
  saveOrderComplete,
  showIconAlert,
  closeIconAlert,
  commitOrderFailed,
  clearEmail,
  submitOrder,
  updatePaymentId,
  submitOfflineOrderLoading,
} from '../actions/order';
import {
  toggleSignaturePanel,
  toggleButtonStatus,
  signatureCaptureComplete,
} from '../actions/signature';
import { persistOrder } from '../actions/orderQueue';
import {
  clearCartItems,
  updateItHaveOrderLevelAdHoc,
  updateOrderLevelAdHoc,
  updateBusinessTime,
} from '../actions/cart';
import { PAYMENT_STATUS_APPROVED, PAYMENT_STATUS_PENDING } from '../constants/creditCard';
import { resetCashAmount } from '../actions/cashPayment';
import {
  fetchCheckoutSession, saveCreditCard, saveCreditCardWithReader,
} from '../apis/creditCard';
import { commitOrder } from '../apis/order';
import { cartSelector } from './priceOrder';
import NavigatorService from '../services/NavigationService';
import { POINT_OF_SALE } from '../constants/router';
import { DUPLICATE_ORDER } from '../constants/errorCode';
import {
  ORDER_STATUS_COMPLETE, ORDER_STATUS_PENDING, ORDER_TYPE_OFFLINE,
  ORDER_TYPE_ONLINE, OFFLINE_MODE_CART_ID,
} from '../constants/order';
import {
  PAYMENT_METHOD_CREDIT_CARD, PAYMENT_METHOD_CASH, FAKE_EMAIL,
} from '../constants/common';
import intl from '../services/i18nService';
import { formatHandle } from '../components/FormatMoney';
import {
  deleteOrderAdHoc, updateUICoupons, setFilterProductNameShown, setSearchBarShown,
} from '../actions/product';
import {
  updateSwipeCardInfo,
  updateSwipeAvailableStatus,
} from '../actions/cardReaderStatus';
import isValidEmail from '../utils/validation';
import { localeAndCurrencySelector, currencySelector } from '../reducers/localeAndCurrency';

import {
  offlineModeRequestError,
} from '../actions/offlineMode';

import handlePingBaseUrlRequest from './offlineMode';
import { persistSignature, updateLastestLocalOrderId } from '../actions/signatureQueue';
import { signatureCaptureFlow } from './signature';
import { queueSelector } from '../reducers/orderQueue';

const { formatMessage } = intl;
const initCardInfo = {
  iin: '',
  ksn: '',
  mp: '',
  mpstatus: '',
  track1: '',
  track2: '',
  track3: '',
};

export const cardInfoSelector = ({ creditCard: { cardInfo } }) => cardInfo;
export const swipeCardInfoSelector = ({ cardReaderStatus: { swipedCardInfo } }) => swipedCardInfo;
export const keyerEPIDSelector = ({ login: { keyerEPID } }) => keyerEPID;
export const remainingBalanceSelector = ({ cart: { remainingBalance } }) => remainingBalance;
export const cashAmountSelector = ({ cashPayment: { cashPaymentAmount } }) => cashPaymentAmount;
export const agencyGuidSelector = ({ agency: { agencySelected: { agencyGuid } } }) => agencyGuid;
export const userSelector = ({
  login: { accountProfile: { firstName, lastName } },
}) => ({ firstName, lastName });
export const catalogSelector = ({ catalogs: { selected: { id } } }) => id;
export const emailSelector = ({ order: { email } }) => email.trim();
export const signatureSelector = ({ signature: { encodedSignature } }) => encodedSignature;
// eslint-disable-next-line max-len
export const localOrderIdSelector = ({ signatureQueue: { lastestLocalOrderId } }) => lastestLocalOrderId;
export const agencySelector = ({ agency: { agencySelected: selectedAgency } }) => selectedAgency;

export const offlineModeSelector = ({
  offlineMode: {
    enabled,
  },
}) => enabled;

export const dealEmail = (email, paymentMethod) => {
  const validEmail = isValidEmail(email) ? email : '';
  const defaultEmail = FAKE_EMAIL;
  return validEmail === '' && paymentMethod === PAYMENT_METHOD_CREDIT_CARD ? defaultEmail : validEmail;
};

export const cartItemsSelector = ({
  cart: {
    cartItems,
  },
}) => cartItems;

function* generateOrderData(paymentMethod) {
  const cart = yield select(cartSelector);
  const keyerEPID = yield select(keyerEPIDSelector);
  const email = yield select(emailSelector);
  cart.keyerEPID = keyerEPID;
  return {
    cart,
    billingContact: {
      email: dealEmail(email, paymentMethod),
    },
  };
}

export function* generateOrderExtraData({
  orderId = '',
  orderNumber = '',
  paymentType,
  email = '',
  type = ORDER_TYPE_ONLINE,
  status = ORDER_STATUS_COMPLETE,
  paymentStatus = PAYMENT_STATUS_APPROVED,
}) {
  const cart = yield select(cartSelector);
  const keyerEPID = yield select(keyerEPIDSelector);
  const parsedAmount = parseFloat(cart.remainingBalance);
  const currentTime = cart.businessTime;
  const currencyCode = yield select(currencySelector);

  return {
    enterprisePersonId: keyerEPID,
    orderNumber,
    type,
    paymentType: parsedAmount === 0 ? undefined : paymentType,
    status,
    paymentStatus,
    orderRecordedDt: moment(currentTime).toISOString(),
    cart,
    orderId: orderId === '' ? cart.id : orderId,
    amount: parsedAmount,
    email,
    currencyCode,
  };
}

export function* persistOrderToQueue(param) {
  const agencyGuid = yield select(agencyGuidSelector);
  const catalogId = yield select(catalogSelector);
  const user = yield select(userSelector);
  const localOrderId = yield UUIDGenerator.getRandomUUID();
  const selectedAgency = yield select(agencySelector);
  const order = {
    ...param,
    localOrderId,
    agencyGuid,
    catalogId,
    user,
    agencyId: selectedAgency.agencyId,
  };

  yield put(persistOrder(order));
  yield put(updateLastestLocalOrderId(localOrderId));
}

const duplicateOrderMatch = (message) => {
  const duplicateKeywords = /(?:committing order twice)|(?:OrderStatus = FINALIZED)/;
  return duplicateKeywords.test(message);
};

export const orderResultHandler = (result) => {
  const firstOrder = result.data.data[0];
  const { order: { orderId, orderNumber, paymentId } } = firstOrder;

  return { orderId, orderNumber, paymentId };
};

function errorAlert(error) {
  let errorMessage;
  switch (error.errorCode) {
  case DUPLICATE_ORDER:
    errorMessage = formatMessage({ id: 'messages.duplicateError' });
    break;
  default:
    errorMessage = formatMessage({ id: 'messages.genericError' });
  }

  return new Promise((resolve) => {
    Alert.alert(
      formatMessage({ id: 'messages.genericErrorTitle' }),
      errorMessage,
      [
        {
          text: formatMessage({ id: 'messages.ok' }),
          onPress: () => {
            resolve();
          },
        },
      ],
      { cancelable: false },
    );
  });
}

export function* clearOrderLevelDiscount() {
  yield put(deleteOrderAdHoc());
  yield put(updateItHaveOrderLevelAdHoc(false));
  yield put(updateOrderLevelAdHoc({
    haveOrderLevelAdHoc: false,
  }));
  yield put(updateUICoupons([]));
}

export function* saveOrderSuccessfullyHandler(message = formatMessage({ id: 'messages.paymentCompleted' })) {
  yield put(showIconAlert({ message }));
  yield delay(2000);
  yield put(closeIconAlert());
  yield put(clearCartItems());
  yield* clearOrderLevelDiscount();
  yield put(clearCreditCardInfo());
  yield put(clearEmail());
  yield put(setFilterProductNameShown(''));
  yield put(setSearchBarShown(false));
  yield NavigatorService.navigate(POINT_OF_SALE);
}

function* saveOrderFailedHandler(caughtError, isCreditCard) {
  const error = caughtError;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data: { error: { message } = {} } = { error: {} }, status } = error.response;

    if (status === 500) {
      if (duplicateOrderMatch(message)) {
        error.errorCode = DUPLICATE_ORDER;
      }
    }

    if (status === 400 || status === 500) {
      yield put(clearCreditCardInfo());
    }
  }

  yield delay(100);
  yield put(updateSwipeAvailableStatus(false));
  yield errorAlert(error);
  if (isCreditCard) {
    yield put(updateSwipeAvailableStatus(true));
  }
}

function* submitOrderProcess(order) {
  try {
    const orderResult = yield call(commitOrder, order);

    yield put(saveOrderComplete());
    const { orderId, orderNumber, paymentId } = orderResultHandler(orderResult);
    yield put(updatePaymentId(paymentId));

    const email = yield select(emailSelector);
    const extraInfo = yield* generateOrderExtraData({
      orderId,
      orderNumber,
      paymentType: PAYMENT_METHOD_CREDIT_CARD,
      email,
    });
    yield* persistOrderToQueue(extraInfo);
    yield put(toggleSignaturePanel(true));
  } catch (error) {
    yield put(offlineModeRequestError(error));

    yield put(commitOrderFailed());
    throw error;
  }
}

export function* formatNumberWithCurrency(num) {
  const { currency, eventLocale, agencyLocale } = yield select(localeAndCurrencySelector);
  return formatHandle(num, eventLocale || agencyLocale, currency);
}

export function* submitOnlineOrderWithCreditCard() {
  yield call(handlePingBaseUrlRequest);

  try {
    const { data } = yield call(fetchCheckoutSession);
    yield put(getSessionComplete(data));

    try {
      const swipeCardInfo = yield select(swipeCardInfoSelector);
      const { ksn, mp, mpstatus } = swipeCardInfo;
      let result = {};

      if (ksn && mp && mpstatus) {
        result = yield call(saveCreditCardWithReader, {
          sessionInfo: data,
          cardInfo: swipeCardInfo,
        });

        yield put(updateSwipeCardInfo(initCardInfo));
      } else {
        const cardInfo = yield select(cardInfoSelector);
        result = yield call(saveCreditCard, { sessionInfo: data, cardInfo });
      }

      if (result.data === 'SUCCESS') {
        const order = yield* generateOrderData(PAYMENT_METHOD_CREDIT_CARD);
        order.paymentMethodType = PAYMENT_METHOD_CREDIT_CARD;
        order.paymentAccountId = data.sessionId;
        order.billingContact.email = FAKE_EMAIL;
        yield put(saveCreditCardSuccess());
        yield* submitOrderProcess(order);
      } else {
        yield put(saveCreditCardError());
        throw Error('saveCreditCardError');
      }
    } catch (error) {
      yield put(saveCreditCardFailed());
      throw error;
    }
  } catch (error) {
    yield put(getSessionFailed());
    yield put(commitOrderFailed());
    yield* saveOrderFailedHandler(error, true);
  }
  yield put(saveOrderComplete());
}

export function* submitOnlineOrderWithCash() {
  yield call(handlePingBaseUrlRequest);

  const order = yield* generateOrderData(PAYMENT_METHOD_CASH);
  order.paymentMethodType = PAYMENT_METHOD_CASH;

  try {
    const orderResult = yield call(commitOrder, order);
    if (orderResult.status === 200 && orderResult.data.success === true) {
      const { orderId, orderNumber } = orderResultHandler(orderResult);
      const extraInfo = yield* generateOrderExtraData({
        orderNumber,
        orderId,
        paymentType: PAYMENT_METHOD_CASH,
        email: order.billingContact.email,
      });
      yield* persistOrderToQueue(extraInfo);

      const cashAmount = yield select(cashAmountSelector);
      const remainingBalance = yield select(remainingBalanceSelector);
      const changeDue = BigNumber(cashAmount).minus(BigNumber(remainingBalance));
      if (remainingBalance === 0 || changeDue.comparedTo(0) === 0) {
        yield put(saveOrderComplete());
        yield* saveOrderSuccessfullyHandler();
        yield put(resetCashAmount());
      } else {
        const formatChangeDue = yield call(formatNumberWithCurrency, changeDue);
        const message = `${formatMessage({ id: 'messages.changeDue' })} ${formatChangeDue}`;
        yield put(saveOrderComplete());
        yield put(clearEmail());
        yield put(showIconAlert({ showIcon: true, showFooter: true, message }));
        yield* clearOrderLevelDiscount();
      }
    }
  } catch (error) {
    yield put(commitOrderFailed());
    yield* saveOrderFailedHandler(error, false);
    yield put(saveOrderComplete());
  }
}

export function* removeOrderDiscountSaga() {
  yield call(handlePingBaseUrlRequest);

  const cartItems = yield select(cartItemsSelector);

  if (cartItems.length === 0) {
    yield* clearOrderLevelDiscount();
  }
}

export function* saveOrderOffline({ paymentType }) {
  const email = yield select(emailSelector);
  const cart = yield select(cartSelector);
  const keyerEPID = yield select(keyerEPIDSelector);

  if (cart.id === OFFLINE_MODE_CART_ID) {
    delete cart.id;
  }
  cart.keyerEPID = keyerEPID;
  cart.cartItems.forEach((cartItem) => {
    const item = cartItem;
    item.overrideSurcharge = true;
  });
  const extraInfo = yield call(generateOrderExtraData,
    {
      type: ORDER_TYPE_OFFLINE,
      status: ORDER_STATUS_PENDING,
      paymentType,
      paymentStatus: PAYMENT_STATUS_PENDING,
      email,
    });

  const swipedCardInfo = yield select(swipeCardInfoSelector);
  extraInfo.swipedCardInfo = swipedCardInfo;
  yield call(persistOrderToQueue, extraInfo);
  yield delay(2000);
  yield put(saveOrderComplete());
  yield put(updateSwipeCardInfo(initCardInfo));

  const cashAmount = yield select(cashAmountSelector);
  const remainingBalance = yield select(remainingBalanceSelector);
  const changeDue = BigNumber(cashAmount).minus(BigNumber(remainingBalance));
  const noChangeDue = BigNumber(remainingBalance).comparedTo(0) === 0
    || changeDue.comparedTo(0) === 0;

  if (noChangeDue) {
    const successMessage = formatMessage({ id: 'messages.orderSaved' });
    yield call(saveOrderSuccessfullyHandler, successMessage);
    yield put(resetCashAmount());
  } else if (paymentType === PAYMENT_METHOD_CREDIT_CARD) {
    yield put(toggleSignaturePanel(true));
  } else {
    const formatChangeDue = yield call(formatNumberWithCurrency, changeDue);
    const message = `${formatMessage({ id: 'messages.changeDue' })} ${formatChangeDue}`;
    yield put(showIconAlert({ showIcon: true, showFooter: true, message }));
  }

  yield put(clearEmail());
  yield call(clearOrderLevelDiscount);
}

export function* hasCreditCardInfo() {
  const cardInfo = yield select(cardInfoSelector);
  const keys = ['holderName', 'cardNumber', 'cvv', 'month', 'year'];
  return keys.some(key => cardInfo[key] !== '');
}

export function* submitOfflineOrderWithCreditCard() {
  yield put(submitOfflineOrderLoading());
  yield call(saveOrderOffline, { paymentType: PAYMENT_METHOD_CREDIT_CARD });
}

export function* saveSignatureWithOffline() {
  const successMessage = formatMessage({ id: 'messages.orderSaved' });
  yield call(saveOrderSuccessfullyHandler, successMessage);
  yield put(resetCashAmount());

  const signature = yield select(signatureSelector);
  const localOrderId = yield select(localOrderIdSelector);
  yield put(persistSignature({ localOrderId, signature }));
  yield put(toggleButtonStatus(true));
  yield put(signatureCaptureComplete());
}

export function* submitOfflineOrderWithCash() {
  yield call(saveOrderOffline, { paymentType: PAYMENT_METHOD_CASH });
}

export function* processSubmit({ payload }) {
  yield call(handlePingBaseUrlRequest);
  yield delay(300);
  const isOffline = yield select(offlineModeSelector);
  const hasCardInfo = yield call(hasCreditCardInfo);
  const { isCreditCard } = payload;

  if (payload.isSkipEmail) {
    yield put(clearEmail());
  }

  const data = {
    isOnline: !isOffline,
    isCreditCard: payload.isCreditCard,
  };

  if (isOffline && hasCardInfo && isCreditCard) {
    yield put(clearCreditCardInfo());
    yield put(updateSwipeAvailableStatus(true));
  } else {
    yield put(updateBusinessTime(Date.now()));
    yield put(submitOrder(data));
  }
}

export function* submitSignatureCapture() {
  const orderQueue = yield select(queueSelector);
  const { queue } = orderQueue;
  const latestOrder = queue[queue.length - 1];

  if (latestOrder.type === ORDER_TYPE_ONLINE) {
    yield call(signatureCaptureFlow);
  } else {
    yield call(saveSignatureWithOffline);
  }
}
