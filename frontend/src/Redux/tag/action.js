import axios from "axios";

export const LOAD_TAG_COUNT_SUCCESS="LOAD_TAG_COUNT_SUCCESS"
export const LOAD_TAG_LIST_SUCCESS="LOAD_REQ_LIST_SUCCESS"
export const LOAD_REQ_LIST_SUCCESS="LOAD_REQ_LIST_SUCCESS"
export const LOAD_DATA_FAILED="LOAD_DATA_FAILED"

export const GetTagCount = () => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/tag/count/`,
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    dispatch({type:LOAD_TAG_COUNT_SUCCESS,payload:response.data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };
export const GetTagList = () => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/tag`,
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    dispatch({type:LOAD_REQ_LIST_SUCCESS,payload:response.data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };
export const GetReqList = (tagId) => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/tag/${tagId}`,
  
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    dispatch({type:LOAD_REQ_LIST_SUCCESS,payload:response.data})
   
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_DATA_FAILED });
    }
  };