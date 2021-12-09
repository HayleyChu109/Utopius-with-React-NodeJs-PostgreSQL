import axios from "axios";

export const PUT_DRAFT_DATA = "PUT_DRAFT_DATA";
export const LOAD_LIST_SUCCESS = "LOAD_LIST_SUCCESS";
export const LOAD_ANNOUNCEMENT_SUCCESS = "LOAD_ANNOUNCEMENT_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const PUT_START_DATE = "PUT_START_DATE";
export const PUT_END_DATE = "PUT_END_DATE";
export const PUT_TITLE = "PUT_TITLE";
export const DELETE_DRAFT = "DELETE_DRAFT";

export const PutDraft = (content) => {
  localStorage.setItem("cache", JSON.stringify(content));
  return {
    type: PUT_DRAFT_DATA,
    payload: content,
  };
};
export const PutStartDate = (content) => {
  localStorage.setItem("start", JSON.stringify(content));
  return {
    type: PUT_START_DATE,
    payload: content,
  };
};
export const PutEndDate = (content) => {
  localStorage.setItem("end", JSON.stringify(content));
  return {
    type: PUT_END_DATE,
    payload: content,
  };
};
export const PutTitle = (content) => {
  localStorage.setItem("title", JSON.stringify(content));
  return {
    type: PUT_TITLE,
    payload: content,
  };
};
export const DeleteDraft = () => {
  localStorage.removeItem("cache");
  localStorage.removeItem("title");
  localStorage.removeItem("start");
  localStorage.removeItem("end");

  return {
    type: DELETE_DRAFT,
  };
};

export const GetAnnouncementList = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/announce`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatch({ type: LOAD_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetAnnouncement = (requestId) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/announce/${requestId}`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    const { content, start_date, end_date, title } = response.data[0];
    dispatch({ type: LOAD_ANNOUNCEMENT_SUCCESS, payload: response.data[0] });
    dispatch(PutDraft(content));
    if (start_date === null) {
      dispatch(PutStartDate(""));
    } else {
      dispatch(PutStartDate(new Date(start_date)));
    }
    if (end_date === null) {
      dispatch(PutEndDate(""));
    } else {
      dispatch(PutEndDate(new Date(end_date)));
    }
    dispatch(PutTitle(title));
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const PostAnnouncement =
  (title, content, isPrivate, startDate, endDate) => async (dispatch) => {
    let userToken = localStorage.getItem("token");
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/announce`,
        {
          title: title,
          content: content,
          isPrivate: isPrivate,
          startDate: startDate,
          endDate: endDate,
        },

        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      // dispatch({type:LOAD_LIST_SUCCESS,payload:response.data[0]})
    } catch (error) {
      console.log(error);
      dispatch({ type: Load_DATA_FAILED });
    }
  };
export const PutAnnouncement =
  (id, title, content, isPrivate, startDate, endDate) => async (dispatch) => {
    let userToken = localStorage.getItem("token");

    try {
      let response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/announce/${id}`,
        {
          title: title,
          content: content,
          isPrivate: isPrivate,
          startDate: startDate,
          endDate: endDate,
        },

        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      dispatch({ type: LOAD_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: Load_DATA_FAILED });
    }
  };
export const DeleteAnnouncement = (id) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/announce/${id}`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatch({ type: LOAD_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
