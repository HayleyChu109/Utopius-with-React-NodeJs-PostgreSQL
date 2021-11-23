import { useState, useEffect } from "react";

const ResponseForm = ({ requestId, userId, setResponseMsg, responseList }) => {
  const [resIdList, setResIdList] = useState([]);

  useEffect(() => {
    if (responseList && responseList.length > 0) {
      let responseIdList = responseList.map((res) => res.responserId);
      console.log(responseIdList);
      setResIdList(responseIdList);
    } else {
      console.log("responseList empty");
      return;
    }
  }, [responseList]);

  return (
    <>
      {resIdList && resIdList.includes(userId) ? (
        <div>You have already responded</div>
      ) : (
        <div className="response-form p-4 mx-auto">
          <div className="response-heading px-2 pb-3">CREATE RESPONSE</div>
          <textarea
            className="form-control response-ta mx-auto pb-4"
            placeholder="Join this request and leave a message.."
            rows="10"
            maxLength="230"
            onChange={(e) => {
              setResponseMsg(e.currentTarget.value);
            }}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default ResponseForm;
