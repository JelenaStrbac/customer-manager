import React from "react";
import { connect } from "react-redux";

import "./Filter.scss";
import Icon from "../../../components/UI/Icon/Icon";
import Input from "../../../components/UI/Input/Input";
// import * as actions from "../../../store/actions";

const Filter = (props) => {
  //   const inputChangeHandler = (e) => {
  //     e.preventDefault();
  //     props.onSearch(e.target.value);
  //   };
//   const [filterForm, setFilterForm] = useState({
    const filterForm = {
    size: {
      elementType: "checkbox",
      elementConfig: {
        label: "Company Size",
        obj: [
          {
            label: "Micro",
            type: "checkbox",
          },
          {
            label: "Small",
            type: "checkbox",
          },
          {
            label: "Medium",
            type: "checkbox",
          },
          {
            label: "Large",
            type: "checkbox",
          },
        ],
      },
      value: "",
      validation: {
        isChecked: true,
      },
      valid: false,
      touched: false,
    },
    industry: {
      elementType: "checkbox",
      elementConfig: {
        label: "Industry",
        obj: [
          {
            label: "Education",
            type: "checkbox",
          },
          {
            label: "IT",
            type: "checkbox",
          },
          {
            label: "Health",
            type: "checkbox",
          },
          {
            label: "Finance",
            type: "checkbox",
          },
          {
            label: "Production",
            type: "checkbox",
          },
          {
            label: "Other",
            type: "checkbox",
          },
        ],
      },
      value: "",
      validation: {
        isChecked: true,
      },
      valid: false,
      touched: false,
    },
  };

  const formElementsArray = [];
  for (let key in filterForm) {
    formElementsArray.push({
      id: key,
      config: filterForm[key],
    });
  }

  let form = (
    <form className="FilterForm">
      {formElementsArray.map((el, idx) => {
        return (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            shouldValidate={el.config.validation}
            invalid={!el.config.valid}
            touched={el.config.touched}
            label={el.config.elementConfig.label}
            // changed={(e) => inputChangedHandler(e, el.id)}
          />
        );
      })}
    </form>
  );

  return (
    <div className="Filter">
      <div className="SortTitle">
        <Icon icon="filter" />
        <span>Filter</span>
      </div>
      {form}
      {/* <div className="Select">
        <select>
          <option value="" disabled selected>
            Filter by Name
          </option>
          <option>Alphabet - A-Z</option>
          <option>Alphabet - Z-A</option>
        </select>
      </div>
      <div className="Select">
        <select>
          <option value="" disabled selected>
            Filter by Turnover
          </option>
          <option>Lowest to Highest</option>
          <option>Highest to Lowest</option>
        </select>
      </div> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSearch: (query) => dispatch(actions.searchQuery(query)),
  };
};

export default connect(null, mapDispatchToProps)(Filter);
