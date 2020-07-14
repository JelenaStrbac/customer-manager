import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searchQuery: "",
  sortQuery: "",
};

// search
const searchQuery = (state, action) => {
  return { ...state, searchQuery: action.query };
};

// sort
const sortQuery = (state, action) => {
  return { ...state, sortQuery: action.query};
};

const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY:
      return searchQuery(state, action);
    case actionTypes.SORT_QUERY:
      return sortQuery(state, action);
    default:
      return state;
  }
};

export default toolsReducer;
