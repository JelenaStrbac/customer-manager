import React from "react";
import { connect } from "react-redux";

import "./Filter.scss";
import Icon from "../../../components/UI/Icon/Icon";
import Checkboxes from "./Checkboxes/Checkboxes";
import * as actions from "../../../store/actions";

const Filter = (props) => {
  const companySize = [
    { name: "Micro" },
    { name: "Small" },
    { name: "Medium" },
    { name: "Large" },
  ];

  const industry = [
    { name: "Education" },
    { name: "Finance" },
    { name: "Health" },
    { name: "IT" },
    { name: "Production" },
    { name: "Other" },
  ];
  return (
    <div className="Filter">
      <div className="SortTitle">
        <Icon icon="filter" />
        <span>Filter</span>
      </div>
      <Checkboxes
        title="Company size"
        checkboxes={companySize}
        onCheck={props.onFilterOne}
      />
      <Checkboxes
        title="Industry"
        checkboxes={industry}
        onCheck={props.onFilterTwo}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterOne: (query) => dispatch(actions.filterQueryOne(query)),
    onFilterTwo: (query) => dispatch(actions.filterQueryTwo(query)),
  };
};

export default connect(null, mapDispatchToProps)(Filter);
