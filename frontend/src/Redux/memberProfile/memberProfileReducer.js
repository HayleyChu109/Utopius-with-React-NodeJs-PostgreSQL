import { MEMBER_INFO_SUCCESS_ACTION } from "./memberProfileActions";
// import { MEMBER_INFO_FAILURE_ACTION } from "./memberProfileActions";

const initialState = {
  memberInfo: [],
};

export function memberProfileReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_INFO_SUCCESS_ACTION:
      console.log(action.payload);
      return {
        memberInfo: state.memberInfo.concat(action.payload),
      };

    default:
      return state;
  }
}
