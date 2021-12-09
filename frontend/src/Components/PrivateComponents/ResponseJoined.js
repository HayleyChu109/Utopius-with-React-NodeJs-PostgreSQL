import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getResponseListThunk } from "../../Redux/request/actions";
import RequestMessage from "../PrivateComponents/RequestMessage";

const ResponseJoined = ({ requestId, userId, editRes, setResponseMsg }) => {
  const { responseList, editSuccessMsg, requestDetail } = useSelector(
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
      return;
    }
  }, [responseList, userId, editSuccessMsg]);

  return (
    <>
      {editRes ? (
        <>
          {resIdList && resIdList.includes(userId) ? (
            <>
              <div className="response-matching-bg">
                <div className="response-form response-matching-msg">
                  <div className="response-form p-2 mx-auto">
                    <div className="response-heading pt-3 pb-1">
                      Edit Response
                    </div>
                    <div
                      className="response-matching-helper pb-2"
                      style={{ color: "#ff6161" }}
                    >
                      Please wait for the requester to match up
                    </div>
                  </div>
                </div>
              </div>
              <div className="response-form mx-auto m-4">
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
            </>
          ) : null}
        </>
      ) : (
        <>
          {resIdList &&
          resIdList.includes(userId) &&
          requestDetail.status === "open" ? (
            <>
              <div className="response-matching-bg">
                <div className="response-form response-matching-msg">
                  <div className="response-form p-2 mx-auto">
                    <div className="response-heading pt-3 pb-1">
                      Response Submitted
                    </div>
                    <div
                      className="response-matching-helper pb-2"
                      style={{ color: "#ff6161" }}
                    >
                      Please wait for the requester to match up
                    </div>
                  </div>
                </div>
              </div>
              <RequestMessage response={responseHistory[0]} />
            </>
          ) : resIdList &&
            resIdList.includes(userId) &&
            requestDetail.status === "matched" ? (
            <>
              <div className="response-matching-bg">
                <div className="response-form response-matching-msg">
                  <div className="response-form p-2 mx-auto">
                    <div className="response-heading pt-3 pb-1">Meet up</div>
                    <div
                      className="response-matching-helper pb-2"
                      style={{ color: "#ff6161" }}
                    >
                      A private space for the team
                    </div>
                  </div>
                </div>
              </div>
              <RequestMessage response={responseHistory[0]} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ResponseJoined;
