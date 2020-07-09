import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  customers: [],
};

const customerStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const customerSucess = (state, action) => {
  const newCustomer = {
    ...action.customerData,
    id: action.customerId,
  };

  return {
    ...state,
    loading: false,
    customers: [...state.customers, newCustomer],
  };
};

const customerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// ALL reducers for authentication combined
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMER_START:
      return customerStart(state, action);
    case actionTypes.CUSTOMER_SUCCESS:
      return customerSucess(state, action);
    case actionTypes.CUSTOMER_FAIL:
      return customerFail(state, action);
    default:
      return state;
  }
};

export default customerReducer;
