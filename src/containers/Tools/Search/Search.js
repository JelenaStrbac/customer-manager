import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "./Search.scss";
import Input from "../../../components/UI/Input/Input";
import Icon from "../../../components/UI/Icon/Icon";
import * as actions from "../../../store/actions";

const Search = (props) => {
  const [querySearch, setQuerySearch] = useState(props.searchQueryFromRedux);

  const search = useRef(_.debounce((e) => props.onSearch(e), 500)).current; // debounce za pozivanje za 1s, ne konstantno na onChange

  const inputChangeHandler = (e) => {
    search(e.target.value);
    setQuerySearch(e.target.value);
  };

  useEffect(() => {
    setQuerySearch(props.searchQueryFromRedux);
  }, [props.searchQueryFromRedux]);

  return (
    <div className="SearchBar">
      <Icon icon="search" />
      <Input
        type="text"
        placeholder="Search customers"
        value={querySearch}
        changed={(e) => inputChangeHandler(e)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchQueryFromRedux: state.tools.searchQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => dispatch(actions.searchQuery(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
