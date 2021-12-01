import {
  MEMBER_BOOKMARK_SUCCESS_ACTION,
  CLEAR_MEMBER_BOOKMARK_ACTION,
} from "./memberBookmarkActions";

const initialState = {
  bookmark: [],
};

export function memberBookmarkReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_BOOKMARK_SUCCESS_ACTION:
      return { ...state, bookmark: action.payload };

    case CLEAR_MEMBER_BOOKMARK_ACTION:
      return { ...state, bookmark: action.payload };

    default:
      return state;
  }
}
