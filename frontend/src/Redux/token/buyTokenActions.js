import axios from "axios";

export const UPDATE_PURCHASE_RECORD_SUCCESS_ACTION =
  "UPDATE_PURCHASE_RECORD_SUCCESS_ACTION";
export const UPDATE_TOKEN_SUCCESS_ACTION = "UPDATE_TOKEN_SUCCESS_ACTION";

export const updatePurchaseRecordThunk =
  (memberId, planId) => async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/updatepurchaserecord`,
        { memberId: memberId, planId: planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data) {
        dispatch({
          type: UPDATE_PURCHASE_RECORD_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

export const updateMemberTokenThunk =
  (memberId, noOfToken) => async (dispatch) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/member/updatetoken`,
        { memberId: memberId, noOfToken: noOfToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data) {
        dispatch({
          type: UPDATE_TOKEN_SUCCESS_ACTION,
          payload: data,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
