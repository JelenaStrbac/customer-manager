import React from "react";

import "./TableRow.scss";

const TableRow = (props) => {
  return (
    <tr className="Tr">
      <td>
        <b>{props.label}:</b>
      </td>
      <td>{props.data}</td>
    </tr>
  );
};

export default TableRow;
