import axios from "axios";
import { tokenPlanThunk } from "../token/tokenPlanActions";
export const Load_TOKEN_TRANSACTION_SUCCESS = "LOAD_TOKEN_TRANSACTION_SUCCESS";
export const Load_TOKEN_USER_TRANSACTION_SUCCESS = "LOAD_TOKEN_USER_TRANSACTION_SUCCESS";
export const Load_REDEEM_ITEM_SUCCESS = "LOAD_REDEEM_ITEM_SUCCESS";
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
export const PostTokenPlan = (planObj) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/token/redeemItem`,planObj,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
    dispatch(tokenPlanThunk())
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetRedeemItem = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/token/redeemItem`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REDEEM_ITEM_SUCCESS,payload:response.data})

  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const PostRedeemItem = (itemObj) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/token/redeemItem/`,itemObj,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
   dispatch({type:Load_REDEEM_ITEM_SUCCESS,payload:response.data})

  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const PutRedeemItem = (itemObj,id) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/token/redeemItem/${id}`,itemObj,

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
