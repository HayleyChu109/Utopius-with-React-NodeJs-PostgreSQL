import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import jwt_decode from "jwt-decode";

import RequestMessage from "./RequestMessage";
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
      {/* <div>
        > This is the comment section, may add comment filter, delete cm, edit cm
      </div> */}
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
        <div>No comment for this request</div>
      )}
    </>
  );
};

export default RequestDetailComment;
