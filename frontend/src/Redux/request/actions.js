import axios from "axios";
import jwt_decode from "jwt-decode";

export const SEARCH_REQ_ACTION = "SEARCH_REQ_ACTION";
export const GET_REQUEST_LIST = "GET_REQUEST_LIST";
export const GET_REQUEST_DETAIL = "GET_REQUEST_DETAIL";
export const POST_NEW_REQUEST = "POST_NEW_REQUEST";
export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";

// For nav search-bar
export const searchReq = (search) => {
  return {
    type: SEARCH_REQ_ACTION,
    payload: search,
  };
};

// For rendering all open request
export const getRequestListThunk = () => async (dispatch) => {
  try {
    let userId = jwt_decode(localStorage.getItem("token")).id;
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/requestlist/${userId}`
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: GET_REQUEST_LIST,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const getRequestDetailThunk =
  (requestId, userId) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/member/request/detail/${requestId}/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = response;
      if (data) {
        dispatch({
          type: GET_REQUEST_DETAIL,
          payload: data,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

export const createNewRequestThunk = (newRequest) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/member/request/create`,
      { newRequest },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: POST_NEW_REQUEST,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const bookmarkToggleThunk = (requestId, userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/member/bookmark`,
      {
        userId: userId,
        requestId: requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: BOOKMARK_TOGGLE,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
