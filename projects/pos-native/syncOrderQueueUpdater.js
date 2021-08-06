import { put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import SSEConnectionManager from '../utils/SSEConnectionManager';
import { updateOrderQueue } from '../actions/orderQueue';
import { updateSignatureQueue } from '../actions/signatureQueue';
import { updateLatestSyncTime } from '../actions/orderHistory';
import { ORDER } from '../constants/sse';

export const selectedOrderQueue = ({ orderQueue: { queue } }) => queue;

function* syncOrderQueueUpdater() {
  const latestSyncTime = yield AsyncStorage.getItem(`${ORDER}SsePushVersion`);
  const remoteOrderData = SSEConnectionManager.getInstance().orderList;
  const remoteOrderHistoryList = remoteOrderData.map(orderData => orderData.order);
  const remoteOrderHistoryIds = remoteOrderHistoryList.map((order) => {
    const { orderId } = order;

    if (typeof orderId === 'string') {
      return orderId.toUpperCase();
    }

    return orderId;
  });
  const orderQueue = yield select(selectedOrderQueue);
  const localOrderIds = orderQueue.filter(order => remoteOrderHistoryIds.includes(order.orderId))
    .map(order => order.localOrderId);

  yield put(updateOrderQueue(remoteOrderHistoryIds));
  yield put(updateSignatureQueue(localOrderIds));
  yield put(updateLatestSyncTime(latestSyncTime));
}

export default syncOrderQueueUpdater;
