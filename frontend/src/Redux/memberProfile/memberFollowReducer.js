import {
  FOLLOW_OR_NOT_SUCCESS_ACTION,
  MEMBER_FOLLOW_SUCCESS_ACTION,
  MEMBER_UNFOLLOW_SUCCESS_ACTION,
} from "./memberFollowActions";

const initialState = {
  follow: [],
};

export function memberFollowUnfollowReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_OR_NOT_SUCCESS_ACTION:
      console.log(action.payload);
      return { ...state, follow: action.payload };

    case MEMBER_FOLLOW_SUCCESS_ACTION:
      return { ...state, follow: action.payload };

    case MEMBER_UNFOLLOW_SUCCESS_ACTION:
      return { ...state, follow: action.payload };

    default:
      return state;
  }
}
