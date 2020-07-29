import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import "./Toolbar.scss";
import Logo from "../../components/Logo/Logo";
import Icon from "../../components/UI/Icon/Icon";
import Filter from "../Tools/Filter/Filter";
import Sort from "../Tools/Sort/Sort";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Toolbar = (props) => {
  const location = useLocation();

  return (
    <div
      className={classNames("Toolbar", {
        OpenedMobileToolbar: props.open,
        ClosedMobileToolbar: !props.open,
      })}
    >
      <div className="ToolbarLogo">
        <Logo />
      </div>

      <div className="ToolbarIcons">
        <div className="ToolbarIcon" onClick={() => props.onResetAllFilters()}>
          <Link to="/">
            <Icon icon="home" /> Home
          </Link>
        </div>
        <div className="ToolbarIcon">
          <Link to="/documentation">
            <Icon icon="file" /> Documentation
          </Link>
        </div>
      </div>

      {location.pathname === "/" ? (
        <>
          <Sort /> <Filter />
        </>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetAllFilters: () => dispatch(actions.resetAllFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Toolbar);
