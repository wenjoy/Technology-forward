import { call, put } from 'redux-saga/effects';
import { updateOrderItem } from '../actions/orderQueue';
import fetchPriceOrder from '../apis/order';

/*
 * This saga is responsible for:
 * 1. Invoking related api to get id.
 * 2. Dispatching `updateOrderItem` action to add the id to the target record
 * 3. Returning patched orderPayload when there's no error
 * 4. Returning null when there's error.
 */

function* syncOrderIdPatcher(order) {
  if (order.cart.id) {
    return order;
  }

  try {
    const orderCopy = JSON.parse(JSON.stringify(order));
    const { cart } = order;
    const { data: { data: { id } } } = yield call(fetchPriceOrder, cart);

    orderCopy.orderId = id;
    orderCopy.cart.id = id;

    yield put(updateOrderItem(orderCopy));

    return orderCopy;
  } catch (error) {
    return null;
  }
}

export default syncOrderIdPatcher;
