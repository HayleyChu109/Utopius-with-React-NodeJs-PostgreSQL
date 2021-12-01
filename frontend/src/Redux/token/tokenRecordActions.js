import axios from "axios";

export const CURRENT_TOKEN_SUCCESS_ACTION = "CURRENT_TOKEN_SUCCESS_ACTION";
export const TOKEN_PURCHASE_RECORD_SUCCESS_ACTION =
  "TOKEN_PURCHASE_RECORD_SUCCESS_ACTION";
export const TOKEN_TRANSACTION_RECORD_SUCCESS_ACTION =
  "TOKEN_TRANSACTION_RECORD_SUCCESS_ACTION";

export const getCurrentTokenThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/currenttoken/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: CURRENT_TOKEN_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const tokenPurchaseRecordThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/tokenpurchaserecord/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: TOKEN_PURCHASE_RECORD_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const tokenTransActThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/tokentransactionrecord/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: TOKEN_TRANSACTION_RECORD_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
