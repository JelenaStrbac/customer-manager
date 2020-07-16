import * as actionTypes from "./actionTypes";

// search
export const searchQuery = (query) => {
  return {
    type: actionTypes.SEARCH_QUERY,
    query,
  };
};

// sort
export const sortQuery = (query) => {
  return {
    type: actionTypes.SORT_QUERY,
    query,
  };
};

// filter
export const filterQueryOne = (query) => {
  return {
    type: actionTypes.FILTER_QUERY_ONE,
    query,
  };
};

export const filterQueryTwo = (query) => {
  return {
    type: actionTypes.FILTER_QUERY_TWO,
    query,
  };
};
