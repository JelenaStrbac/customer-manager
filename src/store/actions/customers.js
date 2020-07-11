import * as actionTypes from "./actionTypes";

// adding new customer
export const customerStart = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_START,
  };
};

export const customerSuccess = (id, customerData) => {
  return {
    type: actionTypes.ADD_CUSTOMER_SUCCESS,
    customerId: id,
    customerData,
  };
};

export const customerFail = (error) => {
  return {
    type: actionTypes.ADD_CUSTOMER_FAIL,
    error,
  };
};

export const customerFinished = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_FINISHED,
  };
};

export const customerAdd = (customerData, token) => {
  return {
    type: actionTypes.ADD_CUSTOMER,
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

// editing customer
export const editCustomerStart = () => {
  return {
    type: actionTypes.EDIT_CUSTOMER_START,
  };
};

// export const editCustomerSuccess = (customerData) => {
//   return {
//     type: actionTypes.EDIT_CUSTOMER_SUCCESS,
//     customerData,
//   };
// };
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

export const customerEdit = (customerData, token, id) => {
  return {
    type: actionTypes.EDIT_CUSTOMER,
    customerData,
    token,
    id,
  };
};
