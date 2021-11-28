import { GET_BOOKMARK_SUCCESS_ACTION } from "./getBookmarkActions";

const initialState = {
  bookmark: [],
};

export function getBookmarkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKMARK_SUCCESS_ACTION:
      return {
        bookmark: action.payload,
      };

    default:
      return state;
  }
}
