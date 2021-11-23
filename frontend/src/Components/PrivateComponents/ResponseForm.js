import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getResponseListThunk } from "../../Redux/request/actions";

const ResponseForm = ({ requestId, userId, setResponseMsg }) => {
  const { responseList } = useSelector((state) => state.requestStore);
  const [resIdList, setResIdList] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResponseListThunk(requestId));
  }, [requestId, dispatch]);

  useEffect(() => {
    if (responseList && responseList.length > 0) {
      let responseIdList = responseList.map((res) => res.responserId);
      console.log(responseIdList);
      setResIdList(responseIdList);
      let resRec = responseList.filter((res) => res.responserId === userId);
      setResponseHistory(resRec);
    } else {
      console.log("responseList empty");
      return;
    }
  }, [responseList]);

  return (
    <>
      {resIdList && resIdList.includes(userId) ? (
        <div className="response-form p-4 mx-auto">
          <div className="response-heading px-2 pb-3">RESPONSE SUBMITTED !</div>
          <div className="response-submission-time px-2 pb-2">
            Submission time: {responseHistory[0].created_at}
          </div>
          <textarea
            className="form-control response-ta mx-auto pb-4"
            rows="10"
            defaultValue={responseHistory[0].detail}
            maxLength="250"
            onChange={(e) => {
              setResponseMsg(e.currentTarget.value);
            }}
            disabled
          ></textarea>
        </div>
      ) : null}
    </>
  );
};

export default ResponseForm;
