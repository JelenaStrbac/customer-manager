import React, { useState } from "react";

import "./Checkboxes.scss";
import Checkbox from "./Checkbox";

const Checkboxes = (props) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (e) => {
    const updatedItems = {
      ...checkedItems,
      [e.target.name]: e.target.checked,
    };
    const checkedValuesArr = [];
    for (let key in updatedItems) {
      if (updatedItems[key]) {
        checkedValuesArr.push(key);
      }
    }
    setCheckedItems(updatedItems);
    props.onCheck(checkedValuesArr);
  };

  return (
    <form className="FilterForm">
      <div className="BorderCheckbox">
        <label className="LabelCheckbox">{props.title}</label>
        <div className="Checkboxes-main">
          {props.checkboxes.map((el) => (
            <label key={el.name} className="Container">
              {el.name}
              <Checkbox
                name={el.name}
                checked={checkedItems[el.name]}
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

export default Checkboxes;
