import axios from "axios";

export const SEARCH_REQ_ACTION = "SEARCH_REQ_ACTION";

export const searchReq = (search) => {
  return {
    type: SEARCH_REQ_ACTION,
    payload: search,
  };
};
