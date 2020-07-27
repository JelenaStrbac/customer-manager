import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

// 1. main action creator => auth start, sucess, fail
export const auth = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
  };
};

// 2. action creator for taking token time
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

// 3. action creator for logout (one for remove from local storage)
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucced = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// 4. action creator for checking state
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    }
  };
