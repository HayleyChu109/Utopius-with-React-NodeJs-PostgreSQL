import {
  LOAD_LIST_SUCCESS,
  LOAD_ANNOUNCEMENT_SUCCESS,
  Load_DATA_FAILED,
  PUT_DRAFT_DATA,
  PUT_START_DATE,
  PUT_END_DATE,
  PUT_TITLE,
  DELETE_DRAFT,
} from "./action";
import moment from "moment";
const initialState = {
  draft: {
    title: '',
    data: {},
    startDate:new Date(),endDate:new Date()
  },

  announce: [],
  request: {},
};

export function AnnounceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ANNOUNCEMENT_SUCCESS:
      return { ...state, request: action.payload };
    case LOAD_LIST_SUCCESS:
      return { ...state, announce: action.payload };
    case Load_DATA_FAILED:
      return state;
    case PUT_TITLE:
      return { ...state, draft: { ...state.draft, title: action.payload } };
    case PUT_DRAFT_DATA:
      return { ...state, draft: { ...state.draft, data: action.payload } };
    case PUT_START_DATE:
      return { ...state, draft: { ...state.draft, startDate: action.payload } } ;
    case PUT_END_DATE:
      return { ...state, draft: { ...state.draft, endDate: action.payload } } ;
    case DELETE_DRAFT:
      return { ...state, draft:{title:'',data:{},startDate:'',endDate:''}};
    default:
      return state;
  }
}
