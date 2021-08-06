/* eslint-disable no-continue */
import {
  select, call, put,
} from 'redux-saga/effects';
import { updateOrderItem, orderQueueSyncBegin, orderQueueSyncEnd } from '../actions/orderQueue';
import {
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_CREDIT_CARD,
  NETWORK_ERROR,
  FAKE_EMAIL,
} from '../constants/common';
import {
  ORDER_STATUS_COMPLETE, ORDER_STATUS_PENDING, ORDER_STATUS_FAILED, ORDER_FAILED_DUE_TO_NO_ID,
  ORDER_FAILED_DUE_TO_FAILED,
} from '../constants/order';
import { orderResultHandler, keyerEPIDSelector, dealEmail } from './order';
import { signatureCapture } from './signature';
import fetchPriceOrder, { commitOrder, sendOrderReceipt } from '../apis/order';
import { PAYMENT_STATUS_ERROR, PAYMENT_STATUS_APPROVED } from '../constants/creditCard';
import { queueSelector } from '../reducers/orderQueue';
import syncOrderIdPatcher from './syncOrderIdPatcher';
import syncOrderFailedSubmitter from './syncOrderFailedSubmitter';
import syncOrderValidator from './syncOrderValidator';
import syncOrderQueueUpdater from './syncOrderQueueUpdater';
import { signatureQueueSelector } from '../reducers/signatureQueue';
import { ORDER_PAYMENT_METHOD_CREDIT_CARD } from '../constants/orderHistory';
import { updateSignatureQueue } from '../actions/signatureQueue';

const signatureError = 'SINGNATURE FAILED';
const emailError = 'EMAIL SEND FAILED';

export function* priceOrder(orderItem) {
  const order = orderItem;
  const { cart } = order;
  const {
    data: { data },
  } = yield call(fetchPriceOrder, cart);
  return data;
}
export const LIFESPAN = 72; // Offline order's lifespan, in hours

export function massage(data, paymentAccountId) {
  const {
    cart,
    paymentType: paymentMethodType,
    email,
    amount,
  } = data;
  const isCcOrder = paymentMethodType === ORDER_PAYMENT_METHOD_CREDIT_CARD;

  return {
    cart,
    paymentMethodType: amount > 0 ? paymentMethodType : PAYMENT_METHOD_CASH,
    billingContact: {
      email: isCcOrder ? FAKE_EMAIL : dealEmail(email, paymentMethodType),
    },
    paymentAccountId,
  };
}

export function* postSignature(order, keyerEPID, paymentId) {
  const { localOrderId, paymentType } = order;

  if (paymentType === PAYMENT_METHOD_CREDIT_CARD) {
    const signatures = yield select(signatureQueueSelector);
    const signatureInfo = signatures.find(item => item.localOrderId === localOrderId);

    if (signatureInfo) {
      yield call(signatureCapture, keyerEPID, paymentId, signatureInfo.signature);
    }
  }
}

export function* sendEmailForCreditCard({
  email, paymentType, orderId, agencyId,
}) {
  try {
    if (email && paymentType === PAYMENT_METHOD_CREDIT_CARD) {
      yield call(sendOrderReceipt, orderId, {
        agencyId,
        emailAddress: email,
      });
    }
  } catch (e) {
    throw new Error(emailError);
  }
}

export function* afterPostOrder(order, orderId, keyerEPID, paymentId) {
  const {
    email,
    paymentType,
    agencyId,
  } = order;

  try {
    yield call(postSignature, order, keyerEPID, paymentId);
  } catch (e) {
    throw new Error(signatureError);
  } finally {
    yield call(sendEmailForCreditCard, {
      email, paymentType, orderId, agencyId,
    });
  }
}

export function* postOrder(order, paymentAccountId, keyerEPID) {
  const { localOrderId } = order;

  try {
    const result = yield call(commitOrder, massage(order, paymentAccountId));
    const { orderId, orderNumber, paymentId } = orderResultHandler(result);
    yield put(updateOrderItem({
      orderId,
      orderNumber,
      localOrderId,
      status: ORDER_STATUS_COMPLETE,
      paymentStatus: PAYMENT_STATUS_APPROVED,
      swipedCardInfo: null,
    }));
    yield call(afterPostOrder, order, orderId, keyerEPID, paymentId);
  } catch (error) {
    const { message } = error;

    if (message === NETWORK_ERROR) {
      throw (error);
    }

    if (message !== signatureError && message !== emailError) {
      yield call(syncOrderFailedSubmitter, order, paymentAccountId, ORDER_FAILED_DUE_TO_FAILED);
    }
  }
}

export function* postFailedOrder(order, paymentAccountId, failedReason) {
  const { localOrderId } = order;

  try {
    const result = yield call(commitOrder, { ...massage(order), paymentMethodType: undefined });
    const { orderId, orderNumber } = orderResultHandler(result);

    yield put(updateOrderItem({
      orderId,
      orderNumber,
      localOrderId,
      status: ORDER_STATUS_FAILED,
      paymentStatus: PAYMENT_STATUS_ERROR,
      swipedCardInfo: null,
      failedReason,
    }));

    if (failedReason !== null) {
      yield put(updateSignatureQueue([localOrderId]));
    }
  } catch (error) {
    yield call(syncOrderFailedSubmitter, order, paymentAccountId, failedReason);
  }
}

export default function* syncOrder(action) {
  try {
    // Before sync begins, purge order queue
    yield syncOrderQueueUpdater();

    const networkAvailable = action.payload;

    if (networkAvailable) {
      yield put(orderQueueSyncBegin());
      const orderQueue = yield select(queueSelector);
      const keyerEPID = yield select(keyerEPIDSelector);
      const currentOrders = orderQueue.queue.filter(item => item.enterprisePersonId === keyerEPID);

      for (let i = 0; i < currentOrders.length; i += 1) {
        const order = currentOrders[i];
        if (order.status === ORDER_STATUS_PENDING) {
          const patchedOrder = yield call(syncOrderIdPatcher, order);

          if (patchedOrder === null) {
            yield call(syncOrderFailedSubmitter, order, '', ORDER_FAILED_DUE_TO_NO_ID);

            continue;
          }

          const {
            isValid, paymentAccountId, failedReason,
          } = yield call(syncOrderValidator, patchedOrder, LIFESPAN);

          if (!isValid) {
            yield call(postFailedOrder, patchedOrder, paymentAccountId, failedReason);

            continue;
          }

          yield call(postOrder, patchedOrder, paymentAccountId, keyerEPID);
        }
      }
    }
  } catch (error) {
    yield put(orderQueueSyncEnd());
  } finally {
    yield put(orderQueueSyncEnd());
  }
}
