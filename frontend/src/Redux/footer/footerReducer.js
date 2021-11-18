import {
  SEND_MSG_FAILURE_ACTION,
  SEND_MSG_SUCCESS_ACTION,
} from "./footerAction";

const initialState = {
  successMsg: null,
  errorMsg: null,
};

export function footerReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MSG_SUCCESS_ACTION:
      return { ...state, successMsg: action.message };

    case SEND_MSG_FAILURE_ACTION:
      return { ...state, errorMsg: action.message };

    default:
      return state;
  }
}
