import { useSelector } from "react-redux";
import { useEffect } from "react";

import RequestMessage from "./RequestMessage";

const RequestDetailComment = ({ type }) => {
  const { publicCommentList, privateCommentList, requestDetail } = useSelector(
    (state) => state.requestStore
  );

  return (
    <>
      {type && privateCommentList && privateCommentList.length > 0 ? (
        <div>
          {privateCommentList.map((comment, i) => (
            <RequestMessage key={comment.id} comment={comment} index={i + 1} />
          ))}
        </div>
      ) : !type && publicCommentList && publicCommentList.length > 0 ? (
        <>
          <div className="response-form response-matching-msg">
            <div className="response-heading pt-3 pb-1">Comments</div>
            {requestDetail.status === "open" ||
            requestDetail.status === "matched" ? null : (
              <div
                className="response-matching-helper pb-2"
                style={{ color: "#ff6161" }}
              >
                This is not an open request, comment is disabled
              </div>
            )}
          </div>
          <div>
            {publicCommentList.map((comment, i) => (
              <RequestMessage
                key={comment.id}
                comment={comment}
                index={i + 1}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="ps-5">Be the first to comment on this request !</div>
      )}
    </>
  );
};

export default RequestDetailComment;
