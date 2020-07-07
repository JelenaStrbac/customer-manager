import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import Button from "../../components/UI/Button/Button";
import * as actions from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";

const Logout = (props) => {
  return (
    <div className="Logout">
      <Button clicked={props.onLogout}>LOGOUT</Button>
      <Redirect to="/" />;
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logoutSucced()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
