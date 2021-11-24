import { useState } from "react";

import RequestMessage from "./RequestMessage";
import RequestDetailComment from "./RequestDetailComment";

const ResponseHost = ({
  responseList,
  requiredPpl,
  handleMatch,
  matchList,
  teamList,
  errorMsg,
  status,
}) => {
  return (
    <>
      <div className="response-matching-bg">
        <div className="response-form response-matching-msg">
          <div className="response-heading pt-3 pb-1">RESPONSE</div>
          <div>
            {errorMsg !== "" ? (
              <div
                className="response-matching-helper pb-2"
                style={{ color: "#fa7c92" }}
              >
                {errorMsg}
              </div>
            ) : (
              <div className="response-matching-helper pb-2">
                Matched response : {matchList.length} / {requiredPpl}
              </div>
            )}
          </div>
        </div>
      </div>
      {responseList && responseList.length > 0 ? (
        <RequestMessage
          responseList={responseList}
          matchList={matchList}
          teamList={teamList}
          handleMatch={handleMatch}
          status={status}
        />
      ) : (
        <div>No response</div>
      )}
    </>
  );
};

export default ResponseHost;
