import axios from "axios";

export const REPORT_MEMBER_SUCCESS_ACTION = "REPORT_MEMBER_SUCCESS_ACTION";

export const submitReportThunk =
  (reporterId, reporteeId, title, message) => async (dispatch) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/member/report/`,
        {
          reporterId: reporterId,
          reporteeId: reporteeId,
          title: title,
          message: message,
        },
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
          type: REPORT_MEMBER_SUCCESS_ACTION,
          payload: data,
          message:
            "We will investigate and get back to you as soon as possible. Thank you.",
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
