import React from "react";

import "./Table.scss";

const Table = (props) => {
  return (
    <div className="MainInfoTable">
      <div className="MainInfoTable_Title">{props.title}</div>
      <table className="TableCustomerShow"> 
        <tbody>
          {props.children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
