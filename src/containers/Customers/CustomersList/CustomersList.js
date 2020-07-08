import React from "react";
import { Link } from "react-router-dom";

import "./CustomersList.scss";

const CustomersList = () => {
  return (
    <div className="CustomersList">
      <Link to="/new" className="AddCustomerButton">
       
          <div className="Plus">+</div>
          <div>Add customer</div>
   
      </Link>
      <div className="CustomersBreakdown">
        All customers - grid prikaz fetchovanih plus paginacija
      </div>
    </div>
  );
};

export default CustomersList;
