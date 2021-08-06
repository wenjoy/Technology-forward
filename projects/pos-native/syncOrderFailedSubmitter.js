import { call, put } from 'redux-saga/effects';
import failedOrder from '../apis/failedOrder';
import { massage } from './syncOrder';
import { updateOrderItem } from '../actions/orderQueue';
import { ORDER_STATUS_FAILED } from '../constants/order';
import { PAYMENT_STATUS_ERROR } from '../constants/creditCard';
import { updateSignatureQueue } from '../actions/signatureQueue';
/*
 * This saga is responsible for:
 * 1. Invoking related api to submit failed order.
 * 2. Dispatching `updateOrderItem` action ONLY when submit failed order is a success.
 *    This will change order state to failed and give it a `failedReason`.
 * 3. Returning a boolean to indicate submission status.
 */

function* syncOrderFailedSubmitter(order, paymentAccountId = '', failedReason) {
  try {
    const { agencyGuid, catalogId, user: { firstName, lastName } } = order;
    const { localOrderId, cart: { id } } = order;
    const failedOrderPayload = massage(JSON.parse(JSON.stringify(order)), paymentAccountId);
    const { cart } = failedOrderPayload;

    cart.localOrderId = localOrderId;
    cart.firstName = firstName;
    cart.lastName = lastName;
    cart.failureCause = failedReason;

    yield call(failedOrder, agencyGuid, catalogId, failedOrderPayload);

    let orderId;

    if (!id) {
      orderId = localOrderId;
    } else {
      orderId = id;
    }

    yield put(updateOrderItem({
      orderId,
      localOrderId,
      status: ORDER_STATUS_FAILED,
      paymentStatus: PAYMENT_STATUS_ERROR,
      swipedCardInfo: null,
      failedReason,
    }));

    yield put(updateSignatureQueue([localOrderId]));

    return true;
  } catch (error) {
    return false;
  }
}

export default syncOrderFailedSubmitter;
