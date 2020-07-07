import React from "react";

import "./CustomersList.scss";

const CustomersList = () => {
  return (
    <div className="CustomersList">
      <div className="AddCustomerButton">
        <div className="Plus">+</div>
        <div>Add customer</div>
      </div>
      <div className="CustomersBreakdown">All customers - grid prikaz fetchovanih plus paginacija</div>
    </div>
  );
};

export default CustomersList;
