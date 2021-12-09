import axios from "axios";

export const REDEEM_ITEMS_ACTION = "REDEEM_ITEMS_ACTION";
export const REDEEM_ITEMS_SUCCESS_ACTION = "REDEEM_ITEMS_SUCCESS_ACTION";
export const CLEAR_REDEEM_SUCCESSMSG_ACTION = "CLEAR_REDEEM_SUCCESSMSG_ACTION";
export const REDEEM_HISTORY_ACTION = "REDEEM_HISTORY_ACTION";

export const redeemItemsThunk = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/redeemitems`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: REDEEM_ITEMS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const redeemSubmitThunk =
  (memberId, redeemItemId, redeemItemToken, redeemItemQty) =>
  async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/redeem`,
        {
          accountId: memberId,
          redeemItemId: redeemItemId,
          quantity: redeemItemQty,
          requiredToken: redeemItemToken,
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
          type: REDEEM_ITEMS_SUCCESS_ACTION,
          payload: data,
          message:
            "You have redeemed the product successfully. We will send the redemption letter to your email.",
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

export const clearSuccessMsg = () => {
  return {
    type: CLEAR_REDEEM_SUCCESSMSG_ACTION,
    payload: [],
    message: null,
  };
};

export const redeemHistoryThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/redeemhistory/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: REDEEM_HISTORY_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
