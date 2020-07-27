import React from "react";
import { useLocation } from "react-router-dom";

import "./Navbar.scss";
import Logout from "../Auth/Logout/Logout";
import Search from "../Tools/Search/Search";

const Navbar = (props) => {
  const location = useLocation();

  let title = "";
  switch (location.pathname) {
    case "/":
      title = "Explore Your Customers";
      break;
    case "/new":
      title = "Add New Customer";
      break;
    case "/documentation":
      title = "Documentation";
      break;
    default:
      title = "Browse Your Customer";
  }
  console.log(props);
  return (
    <div className="Navbar">
      <div className="LogoutSign">
        <Logout />
      </div>
      {location.pathname === "/" ? <Search /> : null}
      <div className="BurgerIcon_And_Title">
        <i className="fa fa-bars" onClick={props.toolbarClicked}></i>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Navbar;
