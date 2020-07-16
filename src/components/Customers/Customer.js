import React from "react";
import { Link } from "react-router-dom";

import "./Customer.scss";


const Customer = (props) => {
  return (
  <div className="Customer">
      <h3>{props.name}</h3>
      <a href={props.website} target="_blank" rel="noopener noreferrer">{props.website}</a>
      <div>{props.address}</div>
      <div>Operating revenue: {props.operatingRevenue}</div>
      <Link to={`/show/${props.id}`} className="Button">VIEW</Link>
      </div>
      );
};

export default Customer;
