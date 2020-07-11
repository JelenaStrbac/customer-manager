import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, useRouteMatch, Link } from "react-router-dom";

import "./CustomerDelete.scss";
import * as actions from "../../../store/actions";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

const CustomerDelete = (props) => {
  const match = useRouteMatch();
  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  const idRef = useRef(match.params.id);

  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, idRef.current);
  }, []);

  let content = "Are you sure you want to delete a customer?";
  if (props.particularCustomer) {
    content = `Are you sure you want to delete customer '${props.particularCustomer.customerData.companyName}'?`;
  }

  if (props.isLoading) {
    content = <Spinner />;
  }

  let actions = (
    <React.Fragment>
      <button
        onClick={() => props.deleteCustomer(tokenRef.current, idRef.current)}
        className="Button Delete"
      >
        DELETE
      </button>
      <Link to={`/show/${idRef.current}`} className="Button">
        CANCEL
      </Link>
    </React.Fragment>
  );

  return (
    <div className="CustomerDelete">
      {props.isDeletedSuccessfully ? <Redirect to="/" /> : null}
      <Modal
        content={content}
        actions={actions}
        onDismiss={() => <Link to={`/show/${idRef.current}`} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    particularCustomer: state.customers.particularCustomer,
    token: state.auth.idToken,
    isLoading: state.customers.loading,
    isDeletedSuccessfully: state.customers.isDeletedSuccessfully,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneCustomer: (token, id) =>
      dispatch(actions.fetchOneCustomer(token, id)),
    deleteCustomer: (token, id) => dispatch(actions.customerDelete(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDelete);
