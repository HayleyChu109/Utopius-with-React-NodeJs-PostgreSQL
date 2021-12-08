import axios from "axios";

export const GET_ANNOUNCEMENT_LIST = "GET_ANNOUNCEMENT_LIST";

// Rendering all public announcements in landing page (Public router)
export const getAnnouncementPublicThunk = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/announcementlist`
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: GET_ANNOUNCEMENT_LIST,
        payload: data.announcementList,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
