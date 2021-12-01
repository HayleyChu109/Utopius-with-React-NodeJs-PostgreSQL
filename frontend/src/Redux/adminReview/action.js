import axios from "axios";
export const Load_REVIEW_LIST_SUCCESS = "LOAD_REVIEW_LIST_SUCCESS";
export const Load_REVIEW_STAT_SUCCESS = "LOAD_REVIEW_STAT_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const GetReviewList = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/review`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REVIEW_LIST_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetReviewStat = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/review/stat`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REVIEW_STAT_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};

