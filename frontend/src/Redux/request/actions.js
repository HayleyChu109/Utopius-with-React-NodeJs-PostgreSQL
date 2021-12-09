import axios from "axios";
import jwt_decode from "jwt-decode";

export const SEARCH_REQ_ACTION = "SEARCH_REQ_ACTION";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const GET_REQUEST_LIST = "GET_REQUEST_LIST";
export const GET_REQUEST_DETAIL = "GET_REQUEST_DETAIL";
export const POST_NEW_REQUEST = "POST_NEW_REQUEST";
export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";
export const PUBLIC_COMMENT = "PUBLIC_COMMENT";
export const PRIVATE_COMMENT = "PRIVATE_COMMENT";
export const RESPONSE_LIST = "RESPONSE_LIST";
export const EDIT_RESPONSE = "EDIT_RESPONSE";
export const DELETE_RESPONSE = "DELETE_RESPONSE";
export const MATCH_RESPONSE = "MATCH_RESPONSE";
export const GET_TEAM_LIST = "GET_TEAM_LIST";
export const CHANGE_REQ_STATUS = "CHANGE_REQ_STATUS";
export const GET_REVIEW_LIST = "GET_REVIEW_LIST";
export const REVIEW_SUCCESS = "REVIEW_SUCCESS";

// For nav search-bar
export const searchReq = (search) => {
  return {
    type: SEARCH_REQ_ACTION,
    payload: search,
  };
};

// For clearing up the message
export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
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

// For editing response
export const putNewResponseThunk =
  (requestId, userId, responseMsg) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/member/request/response/edit`,
        { requestId, userId, responseMsg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.result.message) {
        dispatch({
          type: EDIT_RESPONSE,
          payload: data.result.message,
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

// For deleting response
export const deleteResponseThunk = (requestId, userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/member/request/response/delete/${requestId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data.message) {
      dispatch({
        type: DELETE_RESPONSE,
        payload: data.message,
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// For matching response
export const putMatchedResponseThunk =
  (matchedRes, requestId) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/member/request/response/match`,
        {
          matchedRes: matchedRes,
          requestId: requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.result.message) {
        dispatch({
          type: MATCH_RESPONSE,
          payload: data.result.message,
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

// For getting team response
export const getTeamListThunk = (requestId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/request/${requestId}/response/team`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data.teamList && data.teamResId) {
      dispatch({
        type: GET_TEAM_LIST,
        teamList: data.teamList,
        teamResId: data.teamResId,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// For changing request status
export const changeRequestStatusThunk =
  (requestId, newStatus, userId, reward) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/member/request/status/${requestId}`,
        { newStatus: newStatus, userId, reward },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.message) {
        dispatch({
          type: CHANGE_REQ_STATUS,
          payload: data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

// For checking if review is completed or not
export const getReviewInfoThunk = (requestId, userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/request/review/${requestId}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data } = response;
    if (data.message === "Not reviewed") {
      dispatch({
        type: GET_REVIEW_LIST,
        payload: true,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

// For submitting new review
export const postReviewThunk =
  (reviewInfo, requestId, userId, requestDetail) => async (dispatch) => {
    try {
      let token = await localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/request/review/new`,
        { reviewInfo, requestId, userId, requestDetail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = response;
      if (data.message) {
        dispatch({
          type: REVIEW_SUCCESS,
          payload: data.message,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
