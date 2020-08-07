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
        <select
          value={props.sortQueryFromRedux || ""}
          onChange={(e) => props.onSort(e.target.value)}
        >
          <option value="" disabled>
            Sort by:
          </option>
          <option value="az">Name - A-Z</option>
          <option value="za">Name - Z-A</option>
          <option value="asc">Turnover - Ascending</option>
          <option value="des">Turnover - Descending</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sortQueryFromRedux: state.tools.sortQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSort: (query) => dispatch(actions.sortQuery(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
