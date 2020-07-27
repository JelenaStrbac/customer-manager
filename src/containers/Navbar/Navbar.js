import React from "react";
import { useLocation } from "react-router-dom";

import "./Navbar.scss";
import Logout from "../Auth/Logout/Logout";
import Search from "../Tools/Search/Search";

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
    case "/documentation":
      title = "Documentation";
      break;
    default:
      title = "Browse Your Customer";
  }

  return (
    <div className="Navbar">
      <div className="LogoutSign">
        <Logout />
      </div>
      {location.pathname === "/" ? <Search /> : null}

      <h1>{title}</h1>
    </div>
  );
};

export default Navbar;
