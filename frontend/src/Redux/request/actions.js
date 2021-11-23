import axios from "axios";
import jwt_decode from "jwt-decode";

export const SEARCH_REQ_ACTION = "SEARCH_REQ_ACTION";
export const GET_REQUEST_LIST = "GET_REQUEST_LIST";
export const GET_REQUEST_DETAIL = "GET_REQUEST_DETAIL";
export const POST_NEW_REQUEST = "POST_NEW_REQUEST";
export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";
export const PUBLIC_COMMENT = "PUBLIC_COMMENT";
export const PRIVATE_COMMENT = "PRIVATE_COMMENT";
export const RESPONSE_LIST = "RESPONSE_LIST";

// For nav search-bar
export const searchReq = (search) => {
  return {
    type: SEARCH_REQ_ACTION,
    payload: search,
  };
};

// For rendering all open request (Public router)
export const getRequestListThunk = () => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    let userId;
    if (token) {
      userId = jwt_decode(token).id;
    } else {
      userId = null;
    }
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

// For rendering request detail page (Request router)
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

// For posting new request (Request router)
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

// For rendering all bookmarks for a user
export const getBookmarkListThunk = (userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    if (token) {
      let response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/member/bookmarklist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;

      if (data.bookmarkIdList) {
        dispatch({
          type: BOOKMARK_TOGGLE,
          payload: data.bookmarkIdList,
        });
      }
    } else {
      dispatch({
        type: BOOKMARK_TOGGLE,
        payload: [],
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

// For posting member-req bookmark (Request router)
export const bookmarkToggleThunk =
  (requestId, userId, bookmarked) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      let response = null;

      if (bookmarked) {
        response = await axios.delete(
          `${process.env.REACT_APP_API_SERVER}/member/bookmark/${requestId}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
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
      }

      const { data } = response;

      if (data.bookmarkIdList) {
        dispatch({
          type: BOOKMARK_TOGGLE,
          payload: data.bookmarkIdList,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

// For getting comments
export const getCommentThunk = (requestId, type) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/request/comment/${requestId}/${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data.publicCommentList) {
      dispatch({
        type: PUBLIC_COMMENT,
        payload: data.publicCommentList,
      });
    } else if (data.privateCommentList) {
      dispatch({
        type: PRIVATE_COMMENT,
        payload: data.privateCommentList,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

// For posting new comments
export const postNewCommentThunk =
  (requestId, userId, comment, type) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      console.log("Type: ", type);
      let response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/request/comment`,
        {
          userId,
          requestId,
          comment,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.publicCommentList) {
        dispatch({
          type: PUBLIC_COMMENT,
          payload: data.publicCommentList,
        });
      } else if (data.privateCommentList) {
        dispatch({
          type: PRIVATE_COMMENT,
          payload: data.privateCommentList,
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

// For getting response list
export const getResponseListThunk = (requestId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/request/response/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data.responseList) {
      dispatch({
        type: RESPONSE_LIST,
        payload: data.responseList,
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// For posting new response
export const postNewResponseThunk =
  (requestId, userId, detail) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/request/response/new`,
        {
          userId,
          requestId,
          detail,
          matched: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.responseList) {
        dispatch({
          type: RESPONSE_LIST,
          payload: data.responseList,
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
