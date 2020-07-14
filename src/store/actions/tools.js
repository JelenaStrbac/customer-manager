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
