import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "./Search.scss";
import Input from "../../../components/UI/Input/Input";
import Icon from "../../../components/UI/Icon/Icon";
import * as actions from "../../../store/actions";

const Search = (props) => {
  const search = _.debounce((e) => props.onSearch(e), 1000);
  const inputChangeHandler = (e) => {
    search(e.target.value);
  };
  // TODO: debounce za pozivanje za 1s, ne konstantno na onChange, probati sa input eventom, a ne onChange  
  // const inputChangeHandler = (e) => {
    //   e.preventDefault();
    //   props.onSearch(e.target.value);
    // };

  return (
    <div className="SearchBar">
      <Icon icon="search" />
      <Input
        type="text"
        placeholder="Search customers"
        changed={(e) => inputChangeHandler(e)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => dispatch(actions.searchQuery(query)),
  };
};

export default connect(null, mapDispatchToProps)(Search);
