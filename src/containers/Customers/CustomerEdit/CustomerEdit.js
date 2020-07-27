import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, useRouteMatch } from "react-router-dom";

import "./CustomerEdit.scss";
import * as actions from "../../../store/actions";
import CustomerForm from "../CustomerForm";

const CustomerEdit = (props) => {
  const match = useRouteMatch();
  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  const idRef = useRef(match.params.id);

  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, idRef.current);
  }, []);

  const onSubmit = (customerData, token, id) => {
    props.editCustomer(customerData, token, id);
  };

  return (
    <div className="CustomerEdit">
      {props.isEditedSuccessfully ? <Redirect to="/" /> : null}
      <CustomerForm initialFormValues={props.particularCustomer.customerData} id={idRef.current} onSubmit={onSubmit}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    particularCustomer: state.customers.particularCustomer,
    token: state.auth.idToken,
    isEditedSuccessfully: state.customers.isEditedSuccessfully,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneCustomer: (token, id) =>
      dispatch(actions.fetchOneCustomer(token, id)),
    editCustomer: (customerData, token, id) =>
      dispatch(actions.customerEdit(customerData, token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);
