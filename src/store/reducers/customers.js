import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  allCustomers: [],
  isAddedSuccessfully: false,
  particularCustomer: ''
};

// adding new customer
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

// fetching all customers
const fetchCustomersStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const fetchCustomersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    allCustomers: action.allCustomers,
  };
};

const fetchCustomersFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// fetching one particular customer
const fetchCustomerStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const fetchCustomerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    particularCustomer: action.particularCustomer,
  };
};

const fetchCustomerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// ALL REDUCERS COMBINED
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
    case actionTypes.FETCH_CUSTOMERS_START:
      return fetchCustomersStart(state, action);
    case actionTypes.FETCH_CUSTOMERS_SUCCESS:
      return fetchCustomersSuccess(state, action);
    case actionTypes.FETCH_CUSTOMERS_FAIL:
      return fetchCustomersFail(state, action);
    case actionTypes.FETCH_CUSTOMER_START:
      return fetchCustomerStart(state, action);
    case actionTypes.FETCH_CUSTOMER_SUCCESS:
      return fetchCustomerSuccess(state, action);
    case actionTypes.FETCH_CUSTOMER_FAIL:
      return fetchCustomerFail(state, action);
    default:
      return state;
  }
};

export default customerReducer;
