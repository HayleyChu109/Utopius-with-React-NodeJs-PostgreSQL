import { useState, useEffect } from "react";

import RequestMessage from "./RequestMessage";
import RequestDetailComment from "./RequestDetailComment";

const ResponseHost = ({ requestId, userId, responseList, requiredPpl }) => {
  const [matchList, setMatchList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMatch = (newMatchId) => {
    setErrorMsg("");
    if (matchList && matchList.length > 0 && matchList.includes(newMatchId)) {
      let newMatch = matchList.filter((resId) => resId !== newMatchId);
      setMatchList(newMatch);
    } else if (matchList.length >= requiredPpl) {
      setErrorMsg(
        `You are reaching the response limit ! ( ${requiredPpl} response )`
      );
    } else {
      console.log("matchList", matchList);
      let newMatch = matchList.concat([newMatchId]);
      setMatchList(newMatch);
    }
  };

  return (
    <>
      <div className="response-form response-matching-msg">
        <div className="response-heading py-3">RESPONSE</div>
        <div>
          {errorMsg !== "" ? (
            <span
              className="response-matching-helper"
              style={{ color: "#fa7c92" }}
            >
              {errorMsg}
            </span>
          ) : (
            <span className="response-matching-helper">
              Matched response : {matchList.length} / {requiredPpl}
            </span>
          )}
        </div>
      </div>
      {responseList && responseList.length > 0 ? (
        <RequestMessage
          responseList={responseList}
          matchList={matchList}
          handleMatch={handleMatch}
        />
      ) : (
        <div>No response</div>
      )}
    </>
  );
};

export default ResponseHost;
