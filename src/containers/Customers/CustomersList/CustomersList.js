import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";

const CustomersList = (props) => {
  const fetchAllCustomersRef = useRef(props.fetchAllCustomers);
  const tokenRef = useRef(props.token);

  useEffect(() => {
    fetchAllCustomersRef.current(tokenRef.current);
  }, []);

  return (
    <div className="CustomersList">
      <Link to="/new" className="AddCustomerButton">
        <div className="Plus">+</div>
        <div>Add customer</div>
      </Link>
      <div className="CustomersBreakdown">
        All customers - grid prikaz fetchovanih plus paginacija
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allCustomers: state.customers.allCustomers,
    token: state.auth.idToken,
    userId: state.auth.userId,
    isLoading: state.customers.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomers: (token) => dispatch(actions.fetchAllCustomers(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
