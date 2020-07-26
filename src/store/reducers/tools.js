import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searchQuery: "",
  sortQuery: "",
  filterQueryOne: [],
  filterQueryTwo: [],
};

// search
const searchQuery = (state, action) => {
  return { ...state, searchQuery: action.query };
};

// sort
const sortQuery = (state, action) => {
  return { ...state, sortQuery: action.query };
};

// filter
const filterQueryOne = (state, action) => {
  return { ...state, filterQueryOne: action.query };
};

const filterQueryTwo = (state, action) => {
  return { ...state, filterQueryTwo: action.query };
};

const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY:
      return searchQuery(state, action);
    case actionTypes.SORT_QUERY:
      return sortQuery(state, action);
    case actionTypes.FILTER_QUERY_ONE:
      return filterQueryOne(state, action);
    case actionTypes.FILTER_QUERY_TWO:
      return filterQueryTwo(state, action);
    default:
      return state;
  }
};

export default toolsReducer;
