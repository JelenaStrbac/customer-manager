import { takeEvery, takeLatest, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authCheckStateSaga,
} from "./auth";

import {
  customerAddSaga,
  fetchAllCustomersSaga,
  fetchOneCustomerSaga,
  customerEditSaga,
  customerDeleteSaga,
} from "./customers";

export function* watchAuthSaga() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchCustomerSaga() {
  yield all([
    takeLatest(actionTypes.ADD_CUSTOMER, customerAddSaga),
    takeLatest(actionTypes.FETCH_ALL_CUSTOMERS, fetchAllCustomersSaga),
    takeLatest(actionTypes.FETCH_ONE_CUSTOMER, fetchOneCustomerSaga),
    takeLatest(actionTypes.EDIT_CUSTOMER, customerEditSaga),
    takeLatest(actionTypes.DELETE_CUSTOMER, customerDeleteSaga),
  ]);
}
// export function* watchCustomerSaga() {
//   yield takeLatest(actionTypes.ADD_CUSTOMER, customerAddSaga);
//   yield takeLatest(actionTypes.FETCH_ALL_CUSTOMERS, fetchAllCustomersSaga);
//   yield takeLatest(actionTypes.FETCH_ONE_CUSTOMER, fetchOneCustomerSaga);
//   yield takeLatest(actionTypes.EDIT_CUSTOMER, customerEditSaga);
// }
