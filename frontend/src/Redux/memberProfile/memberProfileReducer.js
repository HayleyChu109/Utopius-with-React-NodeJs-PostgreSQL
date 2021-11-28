import { MEMBER_INFO_SUCCESS_ACTION } from "./memberProfileActions";

const initialState = {
  memberInfo: {},
};

export function memberProfileReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_INFO_SUCCESS_ACTION:
      return {
        memberInfo: Object.assign({}, action.payload),
      };

    default:
      return state;
  }
}
