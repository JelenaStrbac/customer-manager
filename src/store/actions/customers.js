import * as actionTypes from "./actionTypes";

// 1. adding new customer
export const addCustomerStart = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_START,
  };
};

export const addCustomerSuccess = (id, customerData) => {
  return {
    type: actionTypes.ADD_CUSTOMER_SUCCESS,
    customerId: id,
    customerData,
  };
};

export const addCustomerFail = (error) => {
  return {
    type: actionTypes.ADD_CUSTOMER_FAIL,
    error,
  };
};

export const addCustomerFinished = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_FINISHED,
  };
};
// ---> main one
export const customerAdd = (customerData, token) => {
  return {
    type: actionTypes.ADD_CUSTOMER,
    customerData,
    token,
  };
};

// 2. fetching all customers
export const fetchCustomersStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMERS_START,
  };
};

export const fetchCustomersSuccess = (allCustomers) => {
  return {
    type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
    allCustomers,
  };
};

export const fetchCustomersFail = (error) => {
  return {
    type: actionTypes.FETCH_CUSTOMERS_FAIL,
    error,
  };
};

// ---> main one
export const fetchAllCustomers = (token, userId) => {
  return {
    type: actionTypes.FETCH_ALL_CUSTOMERS,
    token,
    userId,
  };
};

// 3. fetching one customer
export const fetchCustomerStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMER_START,
  };
};

export const fetchCustomerSuccess = (particularCustomer) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_SUCCESS,
    particularCustomer,
  };
};

export const fetchCustomerFail = (error) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_FAIL,
    error,
  };
};

// ---> main one
export const fetchOneCustomer = (token, id) => {
  return {
    type: actionTypes.FETCH_ONE_CUSTOMER,
    token,
    id,
  };
};

// 4. editing customer
export const editCustomerStart = () => {
  return {
    type: actionTypes.EDIT_CUSTOMER_START,
  };
};

export const editCustomerSuccess = (id, customerData) => {
  return {
    type: actionTypes.EDIT_CUSTOMER_SUCCESS,
    customerId: id,
    customerData,
  };
};

export const editCustomerFail = (error) => {
  return {
    type: actionTypes.EDIT_CUSTOMER_FAIL,
    error,
  };
};

export const editCustomerFinished = () => {
  return {
    type: actionTypes.EDIT_CUSTOMER_FINISHED,
  };
};

// ---> main one
export const customerEdit = (customerData, token, id) => {
  return {
    type: actionTypes.EDIT_CUSTOMER,
    customerData,
    token,
    id,
  };
};

// 5. deleting customer
export const deleteCustomerStart = () => {
  return {
    type: actionTypes.DELETE_CUSTOMER_START,
  };
};

export const deleteCustomerSuccess = (id) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_SUCCESS,
    customerId: id,
  };
};

export const deleteCustomerFail = (error) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_FAIL,
    error,
  };
};

export const deleteCustomerFinished = () => {
  return {
    type: actionTypes.DELETE_CUSTOMER_FINISHED,
  };
};

// ---> main one
export const customerDelete = (token, id) => {
  return {
    type: actionTypes.DELETE_CUSTOMER,
    token,
    id,
  };
};
