import { takeLatest, all } from "redux-saga/effects";

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
  yield all([
    takeLatest(actionTypes.AUTH_USER, authUserSaga),
    takeLatest(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeLatest(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
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
