import {LOAD_DATA_FAILED,LOAD_TASK_LIST_SUCCESS} from './action'

const initialState = {
  task:[]
}
  export function TaskReducer(state = initialState, action) {
    switch (action.type) {
   
      case LOAD_TASK_LIST_SUCCESS:
        return { ...state, task: action.payload };
      case LOAD_DATA_FAILED:
        return state;
      default:
        return state;
    }
  }