import { SIGNUP_INFO_SUCCESS_ACTION } from "./memberInfoFormActions";
import { SIGNUP_INFO_FAILURE_ACTION } from "./memberInfoFormActions";

const initialState = {
  successMsg: null,
  errorMsg: null,
};

export function memberInfoFormReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_INFO_SUCCESS_ACTION:
      return { ...state, successMsg: action.message };

    case SIGNUP_INFO_FAILURE_ACTION:
      return { ...state, errorMsg: action.message };

    default:
      return state;
  }
}
