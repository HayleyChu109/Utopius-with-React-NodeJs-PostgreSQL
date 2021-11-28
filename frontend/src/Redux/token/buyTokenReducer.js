import {
  UPDATE_PURCHASE_RECORD_SUCCESS_ACTION,
  UPDATE_TOKEN_SUCCESS_ACTION,
} from "./buyTokenActions";

const initialState = {
  recordId: [],
  totalToken: [],
};

export function buyTokenReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PURCHASE_RECORD_SUCCESS_ACTION:
      return { ...state, recordId: action.payload };
    case UPDATE_TOKEN_SUCCESS_ACTION:
      return { ...state, totalToken: action.payload };
    default:
      return state;
  }
}
