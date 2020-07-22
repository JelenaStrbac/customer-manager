import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch, Link, Redirect } from "react-router-dom";

import "./CustomerShow.scss";
import * as actions from "../../../store/actions";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/Modal";
import TableRow from "../../../components/UI/Table/TableRow/TableRow";
import Table from "../../../components/UI/Table/Table";

const CustomerShow = (props) => {
  //// modal for deleting customer
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //// fetching customer
  const match = useRouteMatch();
  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  const idRef = useRef(match.params.id);

  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, idRef.current);
  }, []);

  // const {companyName, website, regNumber, address, phone, email} = props.particularCustomer.customerData
  console.log(props.particularCustomer);

  //// showing particular customer
  let particularCustomerShow = null;
  if (props.particularCustomer) {
    particularCustomerShow = (
      <div className="CustomerShowContainer">
        <div className="MainTitle">
          <div>{props.particularCustomer.customerData.companyName}</div>
          <div className="CustomerShow_Buttons">
            <Link to={`/edit/${idRef.current}`} className="Button">
              EDIT
            </Link>
            <button className="Button Delete" onClick={openModal}>
              DELETE
            </button>
          </div>
        </div>

        <div className="Info_and_Industry">
              <Table title="MAIN INFO">
                <TableRow label="Website" data={props.particularCustomer.customerData.website}/>
                <TableRow label="Reg. number" data={props.particularCustomer.customerData.regNumber}/>
                <TableRow label="Address" data={props.particularCustomer.customerData.address}/>
                <TableRow label="Phone" data={props.particularCustomer.customerData.phone}/>
                <TableRow label="Email" data={props.particularCustomer.customerData.email}/>
              </Table>
            
            <Table title="INDUSTRY">
              <TableRow label="Industry" data={props.particularCustomer.customerData.industry}/>
              <TableRow label="Company size" data={props.particularCustomer.customerData.size}/>
              <TableRow label="Employees" data={props.particularCustomer.customerData.employees}/>
            </Table>
        </div>
        
      </div>
    );
  }

  //// Customer delete part
  let content = "Are you sure you want to delete a customer?";
  if (props.particularCustomer) {
    content = `Are you sure you want to delete customer '${props.particularCustomer.customerData.companyName}'?`;
  }

  if (props.isLoading) {
    particularCustomerShow = <Spinner />;
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
      <button className="Button" onClick={closeModal}>
        CANCEL
      </button>
    </React.Fragment>
  );

  return (
    <div className="CustomerShow">
      {props.particularCustomer ? particularCustomerShow : null}
      {props.isDeletedSuccessfully ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      ) : null}
      <Modal
        show={showModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShow);
