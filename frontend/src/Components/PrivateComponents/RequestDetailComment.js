import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import jwt_decode from "jwt-decode";

import { getCommentThunk } from "../../Redux/request/actions";

const RequestDetailComment = ({ requestId, userId, type }) => {
  const { publicCommentList, privateCommentList } = useSelector(
    (state) => state.requestStore
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentThunk(requestId, type));
  }, [dispatch, requestId, type]);

  return (
    <>
      <div>This is the comment section.</div>
      {type && privateCommentList && privateCommentList.length > 0 ? (
        <div>
          {privateCommentList.map((comment) => (
            <div key={comment.id}>
              <div>Commenter ID: {comment.commenterId}</div>
              <div>{comment.detail}</div>
            </div>
          ))}
        </div>
      ) : !type && publicCommentList && publicCommentList.length > 0 ? (
        <div>
          {publicCommentList.map((comment) => (
            <div key={comment.id}>
              <div>Commenter ID: {comment.commenterId}</div>
              <div>{comment.detail}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No comment</div>
      )}
    </>
  );
};

export default RequestDetailComment;
