import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import "./Toolbar.scss";
import Logo from "../../components/Logo/Logo";
import Icon from "../../components/UI/Icon/Icon";
import Filter from "../Tools/Filter/Filter";
import Sort from "../Tools/Sort/Sort";

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
        <Link to="/" className="ToolbarIcon">
          <Icon icon="home" /> Home
        </Link>
        <Link to="/documentation" className="ToolbarIcon">
          <Icon icon="file" /> Documentation
        </Link>
      </div>


      {location.pathname === "/" ? (
        <>
          <Sort /> <Filter />
        </>
      ) : null}
    </div>
  );
};

export default Toolbar;
