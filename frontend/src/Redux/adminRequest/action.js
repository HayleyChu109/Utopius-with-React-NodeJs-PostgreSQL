import axios from "axios";
export const Load_REQUEST_STAT_SUCCESS = "LOAD_REQUEST_STAT_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const Load_REQUEST_SUCCESS = "Load_REQUEST_SUCCESS";
export const Load_REQUEST_CHART_SUCCESS = "Load_REQUEST_CHART_SUCCESS";
export const GetRequestStat = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/request/stat`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatch({ type: Load_REQUEST_STAT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetRequestChart = (start, end) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/request/chart`,

      {
        params: { start: start, end },
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatch({ type: Load_REQUEST_CHART_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetRequestList = () => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/request/`,

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatch({ type: Load_REQUEST_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const FilterRequestList = (query, order, desc) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  try {
    let response;
    if (query !== "") {
      response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/request/search`,

        {
          params: { query: query },
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    } else {
      response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/request/`,

        {
          params: { column: desc, order: order },
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    }
    let result = response.data.sort((a, b) => {
      if (typeof a[order] === "string" && typeof b[order] === "string") {
        return b[order].toLowerCase() - a[order].toLowerCase;
      } else if (order === "tag") {
        return a[order].length - b[order].length;
      } else {
        return a[order] - b[order];
      }
    });
    if (desc) {
      result = result.reverse();
    }

    dispatch({ type: Load_REQUEST_SUCCESS, payload: result });
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
