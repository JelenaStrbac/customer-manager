import * as actionTypes from "./actionTypes";

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

export const customerAdd = (customerData, token) => {
  return {
    type: actionTypes.CUSTOMER_ADD,
    customerData,
    token,
  };
};
