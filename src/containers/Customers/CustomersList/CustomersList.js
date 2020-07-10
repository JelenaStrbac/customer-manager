import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";
import Customer from "../../../components/Customers/Customer";
import Spinner from "../../../components/UI/Spinner/Spinner";

const CustomersList = (props) => {
  const fetchAllCustomersRef = useRef(props.fetchAllCustomers);
  const tokenRef = useRef(props.token);
  const userIdRef = useRef(props.userId);

  useEffect(() => {
    fetchAllCustomersRef.current(tokenRef.current, userIdRef.current);
  }, []);

  console.log(props.allCustomers)
  let showAllCustomers = props.allCustomers.map(el => (
    <Customer 
    key={el.id}
    id={el.id}
    name={el.customerData.companyName}
    website={el.customerData.website}
    />
  ))

  if (props.isLoading) {
    showAllCustomers = <Spinner />;
  }

  return (
    <div className="CustomersList">
      <Link to="/new" className="AddCustomerButton">
        <div className="Plus">+</div>
        <div>Add customer</div>
      </Link>
      <div className="CustomersBreakdown">
      {showAllCustomers ? showAllCustomers : null}

        {/* All customers - grid prikaz fetchovanih plus paginacija */}
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
    fetchAllCustomers: (token, userId) => dispatch(actions.fetchAllCustomers(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
