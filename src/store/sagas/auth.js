import { put, delay } from "redux-saga/effects";
import axios from "../../axios";

import * as actions from "../actions";

// 1.
export function* authUserSaga(action) {
  // AUTH START
  yield put(actions.authStart());

  const data = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  //   const url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsYNXD4YFAmfFwwDB1BScL105tr_FpOBo";
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsYNXD4YFAmfFwwDB1BScL105tr_FpOBo";

  try {
    const response = yield axios.post(url, data);

    // local storage
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    // AUTH SUCCESS
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    // AUTH CHECK TIMEOUT
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    // AUTH FAIL
    yield put(actions.authFail(error.response.data.error));
  }
}

// 2.
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout()); // initiateLogout
}

// 3.
export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucced());
}

// 4.
export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout()); // initiateLogout
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout()); // initiateLogout
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
