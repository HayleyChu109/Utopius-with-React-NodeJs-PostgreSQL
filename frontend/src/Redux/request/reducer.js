import { SEARCH_REQ_ACTION } from "./actions";

const initialState = {
  search: "",
};

export function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQ_ACTION:
      return { ...state, search: action.payload };

    default:
      return state;
  }
}
