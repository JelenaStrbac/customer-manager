import React from "react";

import "./TableRow.scss";

const TableRow = (props) => {
  return (
    <tr className="Tr">
      <td className="FirstTableData">
        <b>{props.label}</b>
      </td>
      <td className="SecondTableData">{props.data}</td>
    </tr>
  );
};

export default TableRow;
