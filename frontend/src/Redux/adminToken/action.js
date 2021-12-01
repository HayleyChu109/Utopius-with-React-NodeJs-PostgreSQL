import axios from "axios";
export const Load_TOKEN_TRANSACTION_SUCCESS = "LOAD_TOKEN_TRANSACTION_SUCCESS";
export const Load_TOKEN_USER_TRANSACTION_SUCCESS = "LOAD_TOKEN_USER_TRANSACTION_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";


export const GetTokenTransaction = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/token`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_TOKEN_TRANSACTION_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetTokenUserTransaction = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/token/user`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_TOKEN_USER_TRANSACTION_SUCCESS,payload:response.data})
    
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
