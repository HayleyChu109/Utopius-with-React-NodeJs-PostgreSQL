import {
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  LOGOUT_ACTION,
  LOGIN_ADMIN_SUCCESS_ACTION,
  LOGOUT_ADMIN_ACTION,
} from "./actions";

const initialState = {
  isAuthenticated: false || localStorage.getItem("token") != null,
  errorMsg: null,
  isAdmin: false || localStorage.getItem("isAdmin") === "true",
  blacklist: false,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        errorMsg: null,
        isAdmin: false,
        blacklist: false,
      };
    case LOGIN_ADMIN_SUCCESS_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        errorMsg: null,
        isAdmin: true,
        blacklist: false,
      };
    case LOGIN_FAILURE_ACTION:
      return { ...state, errorMsg: action.message };
    case LOGOUT_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        blacklist: false,
      };
    case LOGOUT_ADMIN_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        blacklist: false,
      };
    default:
      return state;
  }
}
