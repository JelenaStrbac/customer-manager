import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";

const Logout = (props) => {
  const onClickHandler = () => {
    props.onLogout();
  };

  return (
    <div className="Logout">
      <Button clicked={onClickHandler}>LOGOUT</Button>
      {props.isAuthenticated ? <Redirect to="/auth" /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
