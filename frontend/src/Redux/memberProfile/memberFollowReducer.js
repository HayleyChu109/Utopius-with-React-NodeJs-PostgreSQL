import {
  MEMBER_FOLLOWINGLIST_SUCCESS_ACTION,
  MEMBER_FOLLOWERLIST_SUCCESS_ACTION,
  MEMBER_FOLLOWTOGGLE_SUCCESS_ACTION,
} from "./memberFollowActions";

const initialState = {
  followinglist: [],
  followerlist: [],
};

export function memberFollowUnfollowReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_FOLLOWINGLIST_SUCCESS_ACTION:
      return { ...state, followinglist: action.payload };

    case MEMBER_FOLLOWERLIST_SUCCESS_ACTION:
      return { ...state, followerlist: action.payload };

    case MEMBER_FOLLOWTOGGLE_SUCCESS_ACTION:
      return { ...state, followerlist: action.payload };

    default:
      return state;
  }
}
