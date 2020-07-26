import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  allCustomers: [],
  isAddedSuccessfully: false,
  isEditedSuccessfully: false,
  isDeletedSuccessfully: false,
  particularCustomer: "",
};

// 1. adding new customer
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

// 2. fetching all customers
const fetchCustomersStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const fetchCustomersSuccess = (state, action) => {
  let res = action.allCustomers.map((el) => {
    const obj =  { ...el, customerData: { ...el.customerData } };;
    [
      "operatingRevenue",
      "operatingExpenses",
      "financialRevenue",
      "financialExpenses",
      "otherRevenue",
      "otherExpenses",
      "taxation",
      "fixedAssets",
      "currentAssets",
      "equity",
      "longTermLiabilities",
      "shortTermLiabilities",
    ].forEach((k) =>   
      obj.customerData[k] = parseInt(obj.customerData[k])
    );
    return obj;
  });
  
  return {
    ...state,
    loading: false,
    allCustomers: res,
  };
};

const fetchCustomersFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// 3. fetching one particular customer
const fetchCustomerStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const fetchCustomerSuccess = (state, action) => {
  let res =  { ...action.particularCustomer, customerData: { ...action.particularCustomer.customerData } };;
  [
    "operatingRevenue",
    "operatingExpenses",
    "financialRevenue",
    "financialExpenses",
    "otherRevenue",
    "otherExpenses",
    "taxation",
    "fixedAssets",
    "currentAssets",
    "equity",
    "longTermLiabilities",
    "shortTermLiabilities",
  ].forEach((k) =>   
    res.customerData[k] = parseInt(res.customerData[k])
    );



  return {
    ...state,
    loading: false,
    particularCustomer: res,
    // particularCustomer: action.particularCustomer,
  };
};

const fetchCustomerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// 4. editing customer
const editCustomerStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const editCustomerSuccess = (state, action) => {
  const editedCustomer = {
    ...action.customerData,
    id: action.customerId,
  };

  return {
    ...state,
    loading: false,
    allCustomers: state.allCustomers.map((el) =>
      el.id === action.customerId ? editedCustomer : el
    ),
    isEditedSuccessfully: true,
  };
};

const editCustomerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const editCustomerFinished = (state, action) => {
  return { ...state, isEditedSuccessfully: false };
};

// 4. deleting customer
const deleteCustomerStart = (state, action) => {
  return { ...state, loading: true, error: null };
};

const deleteCustomerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    allCustomers: state.allCustomers.filter(
      (el) => el.id !== action.customerId
    ),
    isDeletedSuccessfully: true,
  };
};

const deleteCustomerFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const deleteCustomerFinished = (state, action) => {
  return { ...state, isDeletedSuccessfully: false };
};

// ALL REDUCERS COMBINED
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER_START:
      return customerStart(state, action);
    case actionTypes.ADD_CUSTOMER_SUCCESS:
      return customerSucess(state, action);
    case actionTypes.ADD_CUSTOMER_FAIL:
      return customerFail(state, action);
    case actionTypes.ADD_CUSTOMER_FINISHED:
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
    case actionTypes.EDIT_CUSTOMER_START:
      return editCustomerStart(state, action);
    case actionTypes.EDIT_CUSTOMER_SUCCESS:
      return editCustomerSuccess(state, action);
    case actionTypes.EDIT_CUSTOMER_FAIL:
      return editCustomerFail(state, action);
    case actionTypes.EDIT_CUSTOMER_FINISHED:
      return editCustomerFinished(state, action);
    case actionTypes.DELETE_CUSTOMER_START:
      return deleteCustomerStart(state, action);
    case actionTypes.DELETE_CUSTOMER_SUCCESS:
      return deleteCustomerSuccess(state, action);
    case actionTypes.DELETE_CUSTOMER_FAIL:
      return deleteCustomerFail(state, action);
    case actionTypes.DELETE_CUSTOMER_FINISHED:
      return deleteCustomerFinished(state, action);
    default:
      return state;
  }
};

export default customerReducer;
