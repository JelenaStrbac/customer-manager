import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  idToken: null,
  userId: null,
  error: null,
};

const authStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const authSucess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    idToken: action.idToken,
    userId: action.userId,
  };
};

const authFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const authLogout = (state, action) => {
  return { ...state, idToken: null, userId: null };
};

// ALL reducers for authentication combined
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSucess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
