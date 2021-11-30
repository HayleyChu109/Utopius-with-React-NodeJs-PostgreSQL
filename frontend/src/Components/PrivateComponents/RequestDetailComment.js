import { useSelector } from "react-redux";

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
          <div className="response-matching-bg">
            <div className="response-form response-matching-msg">
              {requestDetail.status === "open" ? (
                <>
                  <div className="response-heading pt-3 pb-1">Comments</div>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#ff6161" }}
                  >
                    This is an open request, discuss and join the team !
                  </div>
                </>
              ) : requestDetail.status === "matched" ? (
                <>
                  <div className="response-matching-bg">
                    <div className="response-heading pt-3 pb-1">Comments</div>
                    <div
                      className="response-matching-helper pb-2"
                      style={{ color: "#ff6161" }}
                    >
                      This is a matched request, successful matches can access
                      the meetup space
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="response-matching-bg">
                    <div className="response-heading pt-3 pb-1">Comments</div>
                    <div
                      className="response-matching-helper pb-2"
                      style={{ color: "#ff6161" }}
                    >
                      This is not an open request, comment is disabled
                    </div>
                  </div>
                </>
              )}
            </div>
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
        <>
          <div className="response-matching-bg">
            <div className="response-form response-matching-msg">
              <div className="response-heading pt-3 pb-1">Comments</div>
              <div
                className="response-matching-helper pb-2"
                style={{ color: "#ff6161" }}
              >
                This is an open request, discuss and join the team !
              </div>
            </div>
          </div>
          <div className="text-center my-4 no-res-no-cm">
            Be the first to comment on this request !
          </div>
        </>
      )}
    </>
  );
};

export default RequestDetailComment;
