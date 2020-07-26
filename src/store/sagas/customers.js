import { put, call } from "redux-saga/effects";
import axios from "../../axios";

import * as actions from "../actions";

/// 1.
export function* customerAddSaga(action) {
  // START
  yield put(actions.customerStart());

  try {
    const response = yield call(() =>
      axios.post(`/customers.json?auth=${action.token}`, action.customerData)
    );

    // SUCCESS
    yield put(actions.customerSuccess(response.data.name, action.customerData));
    // FINISHED
    yield put(actions.customerFinished());
  } catch (error) {
    // FAIL
    yield put(actions.customerFail('Something went wrong'));
  }
}

/// 2.
export function* fetchAllCustomersSaga(action) {
  // START
  yield put(actions.fetchCustomersStart());

  try {
    const response = yield call(() =>
      axios.get(
        `/customers.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
      )
    );

    const fetchedCustomers = [];
    for (let key in response.data) {
      fetchedCustomers.push({
        ...response.data[key],
        id: key,
      });
    }

    // SUCCESS
    yield put(actions.fetchCustomersSuccess(fetchedCustomers));
  } catch (error) {
    // FAIL
    yield put(actions.fetchCustomersFail(error.response.data.error));
  }
}

/// 3.
export function* fetchOneCustomerSaga(action) {
  // START
  yield put(actions.fetchCustomerStart());

  try {
    const response = yield call(() =>
      axios.get(
        `/customers.json?auth=${action.token}&orderBy="$key"&equalTo="${action.id}"`
      )
    );
    let fetchedCustomer = {};
    for (let key in response.data) {
      fetchedCustomer = {
        ...response.data[key],
        id: key,
      };
    }

    // SUCCESS
    yield put(actions.fetchCustomerSuccess(fetchedCustomer));
  } catch (error) {
    // FAIL
    yield put(actions.fetchCustomerFail(error.response.data.error));
  }
}

/// 4.
export function* customerEditSaga(action) {
  // START
  yield put(actions.editCustomerStart());

  try {
    const response = yield call(() =>
      axios.patch(
        `/customers/${action.id}/.json?auth=${action.token}`,
        action.customerData
      )
    );

    // SUCCESS
    yield put(actions.editCustomerSuccess(action.id, response.data));
    // FINISHED
    yield put(actions.editCustomerFinished());
  } catch (error) {
    // FAIL
    yield put(actions.editCustomerFail(error.response.data.error));
  }
}

/// 5.
export function* customerDeleteSaga(action) {
  // START
  yield put(actions.deleteCustomerStart());

  try {
    yield call(() =>
      axios.delete(`/customers/${action.id}/.json?auth=${action.token}`)
    );

    // SUCCESS
    yield put(actions.deleteCustomerSuccess(action.id));
    // FINISHED
    yield put(actions.deleteCustomerFinished());
  } catch (error) {
    // FAIL
    yield put(actions.deleteCustomerFail(error.response.data.error));
  }
}
