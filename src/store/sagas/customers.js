import { put } from "redux-saga/effects";
import axios from "../../axios";

import * as actions from "../actions";

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
  } catch (error) {
    // FAIL
    yield put(actions.customerFail(error.response.data.error));
  }
}
