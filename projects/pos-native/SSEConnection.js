/* eslint-disable sonarjs/cognitive-complexity */
import {
  call, select, put,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import SSEConnectionManager from '../utils/SSEConnectionManager';
import { updateAsyncStorageData } from '../utils/syncData';
import {
  ITEM, ORDER,
} from '../constants/sse';
import {
  clearProductList,
  resetLoadingInitial,
} from '../actions/product';
import {
  clearOrderHistoryList,
} from '../actions/orderHistory';
import {
  resetSseOrderListDropped,
} from '../actions/SSEConnection';
import { getOrderListByPage } from './orderHistory';

export const selectedAgencyGuidSelector = (
  {
    agency: { selected },
  },
) => selected;

export const selectedCatalogIdSelector = (
  {
    catalogs: { selected },
  },
) => selected;

export const sseOrderDroppedSelector = (
  {
    SSEConnection: { orderListDropped },
  },
) => orderListDropped;

export const SSEInstance = SSEConnectionManager.getInstance();
export const eventChannelCallback = () => {};

export function* doCloseSSEConnection() {
  yield call(SSEInstance.closeSSEConnection);
}

export function* doStartSSEConnection() {
  if (SSEInstance.eventSource) return;

  if (!SSEInstance.orderDropped) {
    yield call(getOrderListByPage);
  }

  const [agencyGuid] = yield select(selectedAgencyGuidSelector);
  const catalog = yield select(selectedCatalogIdSelector);
  const itemSsePushVersion = parseInt(yield AsyncStorage.getItem(`${ITEM}SsePushVersion`), 10) || 0;
  const orderSsePushVersion = parseInt(yield AsyncStorage.getItem(`${ORDER}SsePushVersion`), 10) || 0;
  const SSEProductListString = yield AsyncStorage.getItem('SSEProductList');
  const SSEProductList = JSON.parse(SSEProductListString) || [];

  // If no orderSsePushVersion, it means API call didn't success,
  // SSE may push a lot of data in a short time, it may crash our app.
  // In this case, we won't start SSE.
  if (!orderSsePushVersion) {
    return;
  }

  SSEInstance.startSSEConnection(
    agencyGuid,
    catalog.id,
    itemSsePushVersion,
    orderSsePushVersion,
    SSEProductList,
    updateAsyncStorageData,
  );
}

export function* clearSSERelatedData() {
  yield AsyncStorage.removeItem('SSEProductList');
  yield AsyncStorage.removeItem('itemSsePushVersion');
  yield SSEInstance.clearPersistedOrderList();

  yield put(clearProductList());
  yield put(clearOrderHistoryList());
  yield put(resetSseOrderListDropped());
  yield put(resetLoadingInitial());
}
