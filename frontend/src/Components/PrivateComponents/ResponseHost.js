import { useState } from "react";

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
      console.log("NewMatch: ", newMatch);
    } else if (matchList.length >= requiredPpl) {
      setErrorMsg(
        `You are reaching the response limit ! ( ${requiredPpl} response )`
      );
    } else {
      let newMatch = matchList.concat([newMatchId]);
      if (newMatch.length >= requiredPpl) {
        setErrorMsg(
          `You are reaching the response limit ! ( ${requiredPpl} response )`
        );
      }
      setMatchList(newMatch);
    }
  };

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
          handleMatch={handleMatch}
        />
      ) : (
        <div>No response</div>
      )}
    </>
  );
};

export default ResponseHost;
