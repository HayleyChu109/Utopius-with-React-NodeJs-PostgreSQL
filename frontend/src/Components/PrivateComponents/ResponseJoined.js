import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getResponseListThunk } from "../../Redux/request/actions";
import RequestMessage from "../PrivateComponents/RequestMessage";

const ResponseJoined = ({ requestId, userId, editRes, setResponseMsg }) => {
  const { responseList, editSuccessMsg } = useSelector(
    (state) => state.requestStore
  );
  const [resIdList, setResIdList] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResponseListThunk(requestId));
  }, [requestId, dispatch]);

  useEffect(() => {
    if (responseList && responseList.length > 0) {
      let responseIdList = responseList.map((res) => res.responserId);
      setResIdList(responseIdList);
      let resRec = responseList.filter((res) => res.responserId === userId);
      setResponseHistory(resRec);
    } else {
      console.log("responseList empty");
      return;
    }
  }, [responseList, userId, editSuccessMsg]);

  return (
    <>
      {editRes ? (
        <>
          {resIdList && resIdList.includes(userId) ? (
            <div className="response-form p-4 mx-auto">
              <div className="response-heading px-2 pb-3">EDIT RESPONSE</div>
              <textarea
                defaultValue={responseHistory[0].detail}
                className="form-control input-text bg-white"
                rows="7"
                maxLength="250"
                onChange={(e) => {
                  setResponseMsg(e.currentTarget.value);
                }}
                required
              />
            </div>
          ) : null}
        </>
      ) : (
        <>
          {resIdList && resIdList.includes(userId) ? (
            <div className="response-form p-4 mx-auto">
              <div className="response-heading px-2 pb-3">
                RESPONSE SUBMITTED !
              </div>
              <RequestMessage response={responseHistory[0]} />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default ResponseJoined;
