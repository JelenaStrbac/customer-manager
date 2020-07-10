import { put } from "redux-saga/effects";
import axios from "../../axios";

import * as actions from "../actions";

/// 1.
export function* customerAddSaga(action) {
  // START
  yield put(actions.customerStart());

  try {
    const response = yield axios.post(
      "/customers.json?auth=" + action.token,
      action.customerData
    );

    // SUCCESS
    yield put(actions.customerSuccess(response.data.name, action.customerData));
    // FINISHED
    yield put(actions.customerFinished());
  } catch (error) {
    // FAIL
    yield put(actions.customerFail(error.response.data.error));
  }
}

/// 2.
export function* fetchAllCustomersSaga(action) {
  // START
  yield put(actions.fetchCustomersStart());

  try {
    const response = yield axios.get(
      `/customers.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
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
    const response = yield axios.get(
      //   `/customers.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"&"$key"&equalTo="${action.id}"`
      //   `/customers.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"&"id"&equalTo="${action.id}"`
      `/customers.json?auth=${action.token}&orderBy="$key"&equalTo="${action.id}"`
    );

    // const fetchedCustomer = [];
    // for (let key in response.data) {
    //   fetchedCustomer.push({
    //     ...response.data[key],
    //     id: key,
    //   });
    // }

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
