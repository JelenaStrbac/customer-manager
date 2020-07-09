import React from "react";
import { useLocation } from "react-router-dom";

import "./Navbar.scss";
import Logout from "../Auth/Logout/Logout";
import Input from "../../components/UI/Input/Input";
import Icon from "../../components/UI/Icon/Icon";

const Navbar = () => {
  const location = useLocation();

  let title = "";
  switch (location.pathname) {
    case "/":
      title = "Explore Your Customers";
      break;
    case "/new":
      title = "Add New Customer";
      break;
    default:
      title = "Browse Your Customer"; //TODO:ovde staviti ime customera
  }

  return (
    <div className="Navbar">
      <div className="LogoutSign">
        <Logout />
      </div>
      {location.pathname === "/" ? (
        <div className="SearchBar">
          <Icon icon="search" />
          <Input type="text" placeholder="Search customers" />
        </div>
      ) : null}

      <h1>{title}</h1>
    </div>
  );
};

export default Navbar;