import axios from "axios";

export const LOAD_TASK_LIST_SUCCESS="LOAD_TASK_LIST_SUCCESS"
export const LOAD_DATA_FAILED="LOAD_DATA_FAILED"

export const GetTaskList = () => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/task`,
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(response.data)

    dispatch({type:LOAD_TASK_LIST_SUCCESS,payload:response.data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };
export const PutTaskList = (id,status,solution) => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/task/${id}`,{status:status,solution:solution},
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(response.data)
    dispatch({type:LOAD_TASK_LIST_SUCCESS,payload:response.data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };
export const FilterTaskList = (reqStatus) => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/task`,
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      let data=response.data.filter(item=>item.status===reqStatus)
    dispatch({type:LOAD_TASK_LIST_SUCCESS,payload:data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };
