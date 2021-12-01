import axios from "axios";

export const MEMBER_FOLLOWINGLIST_SUCCESS_ACTION =
  "MEMBER_FOLLOWINGLIST_SUCCESS_ACTION";
export const MEMBER_FOLLOWERLIST_SUCCESS_ACTION =
  "MEMBER_FOLLOWERLIST_SUCCESS_ACTION";
export const MEMBER_FOLLOWTOGGLE_SUCCESS_ACTION =
  "MEMBER_FOLLOW_SUCCESS_ACTION";

export const followingListThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/followinglist/${memberId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: MEMBER_FOLLOWINGLIST_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const followerListThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/followerlist/${memberId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: MEMBER_FOLLOWERLIST_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const followtoggleThunk =
  (followerId, followingId, followed) => async (dispatch) => {
    try {
      let token = localStorage.getItem("token");
      let response;

      if (followed) {
        response = await axios.delete(
          `${process.env.REACT_APP_API_SERVER}/member/unfollow/${followerId}/${followingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/member/follow`,
          { followerId: followerId, followingId: followingId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      const { data } = response;
      console.log(data);
      if (data) {
        dispatch({
          type: MEMBER_FOLLOWTOGGLE_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
