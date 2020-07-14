import React from "react";
// import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Redirect, useHistory } from "react-router-dom";

import "./CustomerCreate.scss";
import CustomerForm from "../CustomerForm";
import * as actions from "../../../store/actions";

const CustomerCreate = (props) => {
  // DRUGA OPCIJA ZA VRACANJE NA POCETNU
  // const history = useHistory();
  // useEffect(() => {
  //   if (props.isAddedSuccessfully) {
  //     history.goBack();
  //   }
  //   return () => props.customerFinished();
  // }, [props.isAddedSuccessfully]);

  const onSubmit = (customerData, token) => {
    props.addCustomer(customerData, token);
  };

  return (
    <div className="CustomerCreate">
      {props.isAddedSuccessfully ? <Redirect to="/" /> : null}
      <CustomerForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAddedSuccessfully: state.customers.isAddedSuccessfully,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customerData, token) =>
      dispatch(actions.customerAdd(customerData, token)),
    // customerFinished: () => dispatch(actions.customerFinished()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreate);
