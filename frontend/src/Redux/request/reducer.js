import {
  SEARCH_REQ_ACTION,
  GET_REQUEST_LIST,
  GET_REQUEST_DETAIL,
  CHANGE_REQ_STATUS,
  POST_NEW_REQUEST,
  BOOKMARK_TOGGLE,
  PUBLIC_COMMENT,
  PRIVATE_COMMENT,
  RESPONSE_LIST,
  DELETE_RESPONSE,
  MATCH_RESPONSE,
  GET_TEAM_LIST,
} from "./actions";

const initialState = {
  search: "",
  requestList: [],
  requestDetail: {},
  requestId: null,
  requestStatus: "",
  bookmarkList: [],
  publicCommentList: [],
  privateCommentList: [],
  responseList: [],
  matchSuccessMsg: "",
  deleteSuccessMsg: "",
  teamList: [],
  teamResId: [],
};

export function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQ_ACTION:
      return { ...state, search: action.payload };
    case GET_REQUEST_LIST:
      return { ...state, requestList: action.payload };
    case GET_REQUEST_DETAIL:
      return { ...state, requestDetail: action.payload };
    case CHANGE_REQ_STATUS:
      return { ...state, requestStatus: action.payload };
    case POST_NEW_REQUEST:
      return { ...state, requestId: action.payload };
    case BOOKMARK_TOGGLE:
      return { ...state, bookmarkList: action.payload };
    case PUBLIC_COMMENT:
      return { ...state, publicCommentList: action.payload };
    case PRIVATE_COMMENT:
      return { ...state, privateCommentList: action.payload };
    case RESPONSE_LIST:
      return { ...state, responseList: action.payload };
    case MATCH_RESPONSE:
      return { ...state, matchSuccessMsg: action.payload };
    case GET_TEAM_LIST:
      return {
        ...state,
        teamList: action.teamList,
        teamResId: action.teamResId,
      };
    case DELETE_RESPONSE:
      return {
        ...state,
        deleteSuccessMsg: action.payload,
      };

    default:
      return state;
  }
}
