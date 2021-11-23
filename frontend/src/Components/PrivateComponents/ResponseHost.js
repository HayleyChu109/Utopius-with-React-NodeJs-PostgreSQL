import { useState, useEffect } from "react";

import RequestMessage from "./RequestMessage";
import RequestDetailComment from "./RequestDetailComment";

const ResponseHost = ({ requestId, userId, responseList }) => {
  // let matchList = localStorage.getItem("matchList");
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    let matchedLocal = localStorage.getItem("match");
    setMatchList(matchedLocal);
  }, []);

  const handleMatch = (newMatchId) => {
    console.log(newMatchId);
    if (!matchList || matchList.length < 1) {
      setMatchList([`${newMatchId}`]);
      localStorage.setItem("matchList", matchList);
    } else if (
      matchList &&
      matchList.length > 0 &&
      matchList.includes(newMatchId)
    ) {
      let newMatch = matchList.filter((resId) => resId !== newMatchId);
      localStorage.setItem("matchList", newMatch);
    } else {
      let newMatch = matchList.push(newMatchId);
      localStorage.setItem("matchList", newMatch);
    }
  };

  return (
    <>
      <div>This is the response list</div>
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
