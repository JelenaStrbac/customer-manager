import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";

import "./CustomerShow.scss";
import * as actions from "../../../store/actions";
import Spinner from "../../../components/UI/Spinner/Spinner";

const CustomerShow = (props) => {
  const match = useRouteMatch();
  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  const idRef = useRef(match.params.id);

  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, idRef.current);
  }, []);

  let particularCustomerShow = null;

  if (props.particularCustomer) {
    particularCustomerShow = (
      <div className="CustomerFormContainer">
        <div className="TableNav">
          {props.particularCustomer.customerData.companyName}
          <Link to={`/edit/${idRef.current}`} className="Button">
            EDIT
          </Link>
          <Link to={`/delete/${idRef.current}`} className="Button Delete">
            DELETE
          </Link>
        </div>
        <div className="TableNavGrey">MAIN INFO</div>
        <table>
          <tbody>
            <tr>
              <td>Website:</td>
              <td>{props.particularCustomer.customerData.website}</td>
            </tr>
            <tr>
              <td>Registration number:</td>
              <td>{props.particularCustomer.customerData.regNumber}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{props.particularCustomer.customerData.address}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{props.particularCustomer.customerData.phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{props.particularCustomer.customerData.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (props.isLoading) {
    particularCustomerShow = <Spinner />;
  }

  // console.log(props.particularCustomer);
  return (
    <div className="CustomerShow">
      {props.particularCustomer ? particularCustomerShow : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    particularCustomer: state.customers.particularCustomer,
    token: state.auth.idToken,
    userId: state.auth.userId, // proveriti da se ovo obrise
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
