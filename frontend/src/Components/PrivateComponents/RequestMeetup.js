// import { useEffect } from "react";
import { useSelector } from "react-redux";

import ResponseHost from "./ResponseHost";
import ResponseJoined from "./ResponseJoined";
import RequestMessage from "./RequestMessage";
import RequestDetailComment from "./RequestDetailComment";

const RequestMeetup = (props) => {
  const {
    requestDetail,
    teamList,
    teamResId,
    // publicCommentList,
    // privateCommentList,
  } = useSelector((state) => state.requestStore);

  return (
    <>
      {requestDetail && requestDetail.requesterId === props.userId ? (
        <ResponseHost
          requestId={props.requestId}
          matchList={props.matchList}
          errorMsg={props.errorMsg}
          status="matched"
        />
      ) : requestDetail && requestDetail.requesterId !== props.userId ? (
        <ResponseJoined requestId={props.requestId} userId={props.userId} />
      ) : null}
      <RequestMessage
        teamList={teamList}
        teamResId={teamResId}
        requestDetail={requestDetail}
        systemWelcomeMsg={true}
      />
      <RequestDetailComment
        requestId={props.requestId}
        userId={props.userId}
        type={props.type}
      />
    </>
  );
};

export default RequestMeetup;
