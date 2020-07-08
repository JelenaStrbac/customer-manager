import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Toolbar.scss";
import Logo from "../../components/Logo/Logo";
import Icon from "../../components/UI/Icon/Icon";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";

const Toolbar = () => {
  const location = useLocation();
  return (
    <div className="Toolbar">
      <div className="ToolbarLogo">
        <Logo />
      </div>
      <div className="ToolbarIcons">
        <Link to="/" className="ToolbarIcon">
          <Icon icon="home" /> Home
        </Link>
        <Link to="/" className="ToolbarIcon">
          <Icon icon="file" /> Documentation
        </Link>
      </div>
      {location.pathname === "/" ? (
        <>
          <Filter /> <Sort />
        </>
      ) : null}
    </div>
  );
};

export default Toolbar;
