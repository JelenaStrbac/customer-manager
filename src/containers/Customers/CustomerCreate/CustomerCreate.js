import React from "react";
import { connect } from "react-redux";

import "./CustomerCreate.scss";
import CustomerForm from "../CustomerForm";
import * as actions from "../../../store/actions";

const CustomerCreate = (props) => {
  const onSubmit = (customerData, token) => {
    props.addCustomer(customerData, token);
  };

  return (
    <div className="CustomerCreate">
      <CustomerForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.customers.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customerData, token) =>
      dispatch(actions.customerAdd(customerData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreate);
