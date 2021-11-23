import React from "react";

const ResponseForm = ({ setResponseMsg }) => {
  return (
    <>
      <div className="response-form p-4 mx-auto">
        <div className="response-heading pb-4">CREATE RESPONSE</div>
        <textarea
          className="form-control response-ta mx-auto pb-4"
          placeholder="Join this request and leave a message.."
          rows="10"
          onChange={(e) => {
            setResponseMsg(e.currentTarget.value);
          }}
        ></textarea>
      </div>
    </>
  );
};

export default ResponseForm;
