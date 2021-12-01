import {
  MEMBER_INFO_SUCCESS_ACTION,
  GET_ALL_USERNAME_SUCCESS_ACTION,
  MY_INFO_SUCCESS_ACTION,
} from "./memberProfileActions";

const initialState = {
  memberInfo: [],
  allUsername: [],
  myInfo: [],
};

export function memberProfileReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_INFO_SUCCESS_ACTION:
      return { ...state, memberInfo: action.payload };
    case GET_ALL_USERNAME_SUCCESS_ACTION:
      return { ...state, allUsername: action.payload };
    case MY_INFO_SUCCESS_ACTION:
      return { ...state, myInfo: action.payload };
    default:
      return state;
  }
}
