import * as actionTypes from "./actionTypes";

// search
export const searchQuery = (query) => {
  return {
    type: actionTypes.SEARCH_QUERY,
    query,
  };
};

// sort
export const sortQueryOne = (query) => {
  return {
    type: actionTypes.SORT_QUERY_ONE,
    query,
  };
};

export const sortQueryTwo = (query) => {
  return {
    type: actionTypes.SORT_QUERY_TWO,
    query,
  };
};
