import {LOAD_DATA_FAILED,LOAD_TAG_COUNT_SUCCESS,LOAD_REQ_LIST_SUCCESS,LOAD_TAG_LIST_SUCCESS} from './action'

const initialState = {
    reqList:[],
    tagStat:[],
    tagList:[]

}
  export function TagReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_TAG_COUNT_SUCCESS:
        return { ...state, tagStat: action.payload };
      case LOAD_REQ_LIST_SUCCESS:
        return { ...state, reqList: action.payload };
      case LOAD_TAG_LIST_SUCCESS:
        return { ...state, tagList: action.payload };
      case LOAD_DATA_FAILED:
        return state;
      default:
        return state;
    }
  }