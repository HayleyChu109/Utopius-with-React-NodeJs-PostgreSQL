import axios from "axios";
export const Load_REQUEST_STAT_SUCCESS = "LOAD_REQUEST_STAT_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const Load_REQUEST_SUCCESS='Load_REQUEST_SUCCESS'
export const GetRequestStat = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/request/stat`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REQUEST_STAT_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetRequestList = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/request/`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REQUEST_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};

