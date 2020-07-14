import React from "react";
import { connect } from "react-redux";

import "./Sort.scss";
import Icon from "../../../components/UI/Icon/Icon";
import * as actions from "../../../store/actions";


const Sort = (props) => {
  return (
    <div className="Sort">
      <div className="SortTitle">
        <Icon icon="sort" />
        <span>Sort</span>
      </div>
      <div className="Select">
        <select defaultValue="" onChange={(e) => props.onSortOne(e.target.value)}>
          <option value="" disabled>
            Sort by Name
          </option>
          <option value="az">Alphabet - A-Z</option>
          <option value="za">Alphabet - Z-A</option>
        </select>
      </div>
      <div className="Select">
        <select
          defaultValue=""
          onChange={(e) => props.onSortTwo(e.target.value)}
        >
          <option value="" disabled>
            Sort by Turnover
          </option>
          <option value="asc">Lowest to Highest</option>
          <option value="des">Highest to Lowest</option>
        </select>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSortOne: (query) => dispatch(actions.sortQueryOne(query)),
    onSortTwo: (query) => dispatch(actions.sortQueryTwo(query)),
  };
};

export default connect(null, mapDispatchToProps)(Sort);
