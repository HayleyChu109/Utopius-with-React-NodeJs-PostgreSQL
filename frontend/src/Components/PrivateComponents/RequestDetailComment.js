import { useSelector } from "react-redux";

import RequestMessage from "./RequestMessage";

const RequestDetailComment = ({ type }) => {
  const { publicCommentList, privateCommentList } = useSelector(
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
        <div>
          {publicCommentList.map((comment, i) => (
            <RequestMessage key={comment.id} comment={comment} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="ps-5">No comment for this request</div>
      )}
    </>
  );
};

export default RequestDetailComment;
