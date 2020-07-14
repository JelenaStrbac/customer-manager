import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searcQuery: "",
  sortQueryOne: "",
  sortQueryTwo: "",
};

// search
const searchQuery = (state, action) => {
  return { ...state, query: action.query };
};

// sort
const sortQueryOne = (state, action) => {
  return { ...state, sortQueryOne: action.query };
};

const sortQueryTwo = (state, action) => {
  return { ...state, sortQueryTwo: action.query };
};

const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY:
      return searchQuery(state, action);
    case actionTypes.SORT_QUERY_ONE:
      return sortQueryOne(state, action);
    case actionTypes.SORT_QUERY_TWO:
      return sortQueryTwo(state, action);
    default:
      return state;
  }
};

export default toolsReducer;
