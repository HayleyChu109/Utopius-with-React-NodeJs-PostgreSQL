import {
  SEARCH_REQ_ACTION,
  CLEAR_MESSAGE,
  GET_REQUEST_LIST,
  GET_REQUEST_DETAIL,
  CHANGE_REQ_STATUS,
  POST_NEW_REQUEST,
  BOOKMARK_TOGGLE,
  PUBLIC_COMMENT,
  PRIVATE_COMMENT,
  RESPONSE_LIST,
  EDIT_RESPONSE,
  DELETE_RESPONSE,
  MATCH_RESPONSE,
  GET_TEAM_LIST,
  GET_REVIEW_LIST,
  REVIEW_SUCCESS,
} from "./actions";

const initialState = {
  search: "",
  requestList: [],
  requestDetail: {},
  requestId: null,
  requestStatusMessage: "",
  bookmarkList: [],
  publicCommentList: [],
  privateCommentList: [],
  responseList: [],
  matchSuccessMsg: "",
  deleteSuccessMsg: "",
  editSuccessMsg: "",
  teamList: [],
  teamResId: [],
  reviewList: [],
  reviewSuccessMsg: "",
};

export function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQ_ACTION:
      return { ...state, search: action.payload };
    case CLEAR_MESSAGE:
      return {
        ...state,
        requestStatusMessage: "",
        matchSuccessMsg: "",
        deleteSuccessMsg: "",
        editSuccessMsg: "",
        reviewSuccessMsg: "",
      };
    case GET_REQUEST_LIST:
      return { ...state, requestList: action.payload };
    case GET_REQUEST_DETAIL:
      return { ...state, requestDetail: action.payload };
    case CHANGE_REQ_STATUS:
      return { ...state, requestStatusMessage: action.payload };
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
    case EDIT_RESPONSE:
      return {
        ...state,
        editSuccessMsg: action.payload,
      };
    case GET_REVIEW_LIST:
      return {
        ...state,
        reviewList: action.payload,
      };
    case REVIEW_SUCCESS:
      return {
        ...state,
        reviewSuccessMsg: action.payload,
      };

    default:
      return state;
  }
}
