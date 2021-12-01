import axios from "axios";

export const FOLLOW_OR_NOT_SUCCESS_ACTION = "FOLLOW_OR_NOT_SUCCESS_ACTION";
export const MEMBER_FOLLOW_SUCCESS_ACTION = "MEMBER_FOLLOW_SUCCESS_ACTION";
export const MEMBER_UNFOLLOW_SUCCESS_ACTION = "MEMBER_UNFOLLOW_SUCCESS_ACTION";

export const followingOrNotThunk =
  (followerId, followingId) => async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/member/follow/${followerId}/${followingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data) {
        dispatch({
          type: FOLLOW_OR_NOT_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

export const followThunk =
  ({ followerId, followingId }) =>
  async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/follow`,
        { followerId: followerId, followingId: followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      console.log(data);
      if (data) {
        dispatch({
          type: MEMBER_FOLLOW_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

export const unFollowThunk =
  ({ followerId, followingId }) =>
  async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/member/${followerId}/unfollow/${followingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data) {
        dispatch({
          type: MEMBER_UNFOLLOW_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
