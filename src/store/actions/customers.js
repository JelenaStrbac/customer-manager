import * as actionTypes from "./actionTypes";

// adding new customer
export const customerStart = () => {
  return {
    type: actionTypes.CUSTOMER_START,
  };
};

export const customerSuccess = (id, customerData) => {
  return {
    type: actionTypes.CUSTOMER_SUCCESS,
    customerId: id,
    customerData,
  };
};

export const customerFail = (error) => {
  return {
    type: actionTypes.CUSTOMER_FAIL,
    error,
  };
};

export const customerFinished = () => {
  return {
    type: actionTypes.CUSTOMER_FINISHED,
  };
};

export const customerAdd = (customerData, token) => {
  return {
    type: actionTypes.CUSTOMER_ADD,
    customerData,
    token,
  };
};

// fetching all customers
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

export const fetchAllCustomers = (token, userId) => {
  return {
    type: actionTypes.FETCH_ALL_CUSTOMERS,
    token,
    userId,
  };
};

// fetching one customer
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

export const fetchOneCustomer = (token, id) => {
  return {
    type: actionTypes.FETCH_ONE_CUSTOMER,
    token,
    id,
  };
};
