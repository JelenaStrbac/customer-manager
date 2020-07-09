import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  allCustomers: [],
  isAddedSuccessfully: false,
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
    allCustomers: [...state.allCustomers, newCustomer],
    isAddedSuccessfully: true,
  };
};

const customerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const customerFinished = (state, action) => {
  return { ...state, isAddedSuccessfully: false };
};

// ALL reducers for adding customer combined
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMER_START:
      return customerStart(state, action);
    case actionTypes.CUSTOMER_SUCCESS:
      return customerSucess(state, action);
    case actionTypes.CUSTOMER_FAIL:
      return customerFail(state, action);
    case actionTypes.CUSTOMER_FINISHED:
      return customerFinished(state, action);
    default:
      return state;
  }
};

export default customerReducer;
