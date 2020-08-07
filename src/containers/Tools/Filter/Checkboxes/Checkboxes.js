import React from "react";

import "./Checkboxes.scss";
import Checkbox from "../../../../components/UI/Input/Checkbox/Checkbox";
import { connect } from "react-redux";

const Checkboxes = (props) => {
  const handleChange = (e) => {
    props.onCheck(e.target.name);
  };

  return (
    <form className="FilterForm">
      <div className="BorderCheckbox">
        <label className="LabelCheckbox">{props.title}</label>
        <div className="Checkboxes-main">
          {props.checkboxes.map((el) => (
            <label key={el.name} className="Container">
              <div>{el.name}</div>
              <Checkbox
                name={el.name}
                checked={
                  props.filterQueryOneFromRedux[el.name] ||
                  props.filterQueryTwoFromRedux[el.name]
                }
                onChange={handleChange}
              />
              <span className="Checkmark"></span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    filterQueryOneFromRedux: state.tools.filterQueryOne,
    filterQueryTwoFromRedux: state.tools.filterQueryTwo,
  };
};

export default connect(mapStateToProps, null)(Checkboxes);
