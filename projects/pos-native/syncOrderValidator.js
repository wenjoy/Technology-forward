import { call } from 'redux-saga/effects';
import { PAYMENT_METHOD_CREDIT_CARD } from '../constants/common';
import { fetchCheckoutSession, saveCreditCardWithReader } from '../apis/creditCard';
import { ORDER_FAILED_DUE_TO_EXPIRED, ORDER_FAILED_DUE_TO_VALIDATION } from '../constants/order';
import isDateExpired from '../utils/isDateExpired';

/*
 * This saga is responsible for:
 * 1. Invoking related api to get id.
 * 2. Dispatching `updateOrderItem` action to add the id to the target record
 * 3. Returning object, shape: { paymentAccountId, isValid, failedReason }
 */

function* syncOrderValidator(order, lifespan) {
  const { orderRecordedDt, paymentType } = order;
  const isCcOrder = paymentType === PAYMENT_METHOD_CREDIT_CARD;
  let paymentAccountId = '';

  if (isCcOrder && isDateExpired(orderRecordedDt, lifespan)) {
    return { paymentAccountId, isValid: false, failedReason: ORDER_FAILED_DUE_TO_EXPIRED };
  }

  if (isCcOrder) {
    try {
      const { data: sessionInfo } = yield call(fetchCheckoutSession);
      const { sessionId } = sessionInfo;

      paymentAccountId = sessionId;

      const { swipedCardInfo: cardInfo } = order;
      const result = yield call(saveCreditCardWithReader, { sessionInfo, cardInfo });

      if (result.data !== 'SUCCESS') {
        throw new Error();
      }

      return { paymentAccountId, isValid: true, failedReason: null };
    } catch (error) {
      return { paymentAccountId, isValid: false, failedReason: ORDER_FAILED_DUE_TO_VALIDATION };
    }
  }

  return { paymentAccountId, isValid: true, failedReason: null };
}

export default syncOrderValidator;
