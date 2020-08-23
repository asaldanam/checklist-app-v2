import { createStore, combineReducers } from "redux";

/** STATE */
const initialState = {
  user: null,
  filter: ''
};

/** ACTION TYPES */
const SET_USER = "SET_USER";
const SET_FILTER = "SET_FILTER";

/** ACTIONS */
export const setUserAction = payload => ({
  type: SET_USER, payload
});

export const setFilterAction = payload => ({
  type: SET_FILTER, payload
});

/** REDUCERS */
const data = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload
      }
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ data });

export default createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);