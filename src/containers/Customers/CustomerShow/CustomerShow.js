import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./CustomerShow.css";
import * as actions from "../../../store/actions";
import { useRouteMatch } from "react-router-dom";

const CustomerShow = (props) => {
  const match = useRouteMatch();
  const id = match.params.id;

  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  // const idRef = useRef(id);

  console.log(match);
  console.log(id);
  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, id);
  }, []);

  console.log(props.particularCustomer);
  return (
    <div className="CustomerShow">
      CustomerShow
      {props.particularCustomer ? props.particularCustomer.customerData.companyName : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    particularCustomer: state.customers.particularCustomer,
    token: state.auth.idToken,
    userId: state.auth.userId,
    isLoading: state.customers.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneCustomer: (token, id) =>
      dispatch(actions.fetchOneCustomer(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShow);
