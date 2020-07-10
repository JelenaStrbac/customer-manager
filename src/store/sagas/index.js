import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authCheckStateSaga,
} from "./auth";

import { customerAddSaga, fetchAllCustomersSaga, fetchOneCustomerSaga } from "./customers";

export function* watchAuthSaga() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchCustomerSaga() {
  yield takeEvery(actionTypes.CUSTOMER_ADD, customerAddSaga);
  yield takeEvery(actionTypes.FETCH_ALL_CUSTOMERS, fetchAllCustomersSaga);
  yield takeEvery(actionTypes.FETCH_ONE_CUSTOMER, fetchOneCustomerSaga);
}
