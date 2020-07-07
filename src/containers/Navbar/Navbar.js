import React from "react";

import "./Navbar.scss";
import Logout from "../Auth/Logout/Logout";
import Input from "../../components/UI/Input/Input";
import Icon from "../../components/UI/Icon/Icon";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="LogoutSign">
        <Logout />
      </div>
      <div className="SearchBar">
        <Icon icon="search" />
        <Input type="text" placeholder="Search customers" />
      </div>
      <h1>Explore Your Customers</h1>
    </div>
  );
};

export default Navbar;
