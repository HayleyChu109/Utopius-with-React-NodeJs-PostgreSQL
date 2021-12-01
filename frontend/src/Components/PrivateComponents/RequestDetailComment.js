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
                  <div className="response-heading pt-3 pb-1">Comments</div>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#ff6161" }}
                  >
                    This is a matched request, successful matches can access the
                    meetup space
                  </div>
                </>
              ) : requestDetail.status === "cancelled" ||
                requestDetail.status === "completed" ? (
                <>
                  <div className="response-heading pt-3 pb-1">Comments</div>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#ff6161" }}
                  >
                    This is not an open request, comment is disabled
                  </div>
                </>
              ) : null}
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
      ) : type && privateCommentList.length < 1 ? (
        <>
          <div className="text-center my-4 no-res-no-cm">
            Discuss with your team in this meetup space !
          </div>
        </>
      ) : !type && publicCommentList.length < 1 ? (
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
                  <div className="response-heading pt-3 pb-1">Comments</div>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#ff6161" }}
                  >
                    This is a matched request, successful matches can access the
                    meetup space
                  </div>
                </>
              ) : requestDetail.status === "cancelled" ||
                requestDetail.status === "completed" ? (
                <>
                  <div className="response-heading pt-3 pb-1">Comments</div>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#ff6161" }}
                  >
                    This is not an open request, comment is disabled
                  </div>
                </>
              ) : null}
            </div>
          </div>
          {requestDetail.status === "open" ||
          requestDetail.status === "matched" ? (
            <div className="text-center my-4 no-res-no-cm">
              Be the first to comment on this request !
            </div>
          ) : (
            <div className="text-center my-4 no-res-no-cm">No comment</div>
          )}
        </>
      ) : null}
    </>
  );
};

export default RequestDetailComment;
