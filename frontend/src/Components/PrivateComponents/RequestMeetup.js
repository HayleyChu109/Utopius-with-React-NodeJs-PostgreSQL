import ResponseHost from "./ResponseHost";
import ResponseJoined from "./ResponseJoined";
import RequestDetailSystemComment from "./RequestDetailSystemComment";
import RequestDetailComment from "./RequestDetailComment";

const RequestMeetup = (props) => {
  return (
    <>
      {props.requestDetail &&
      props.requestDetail.requesterId === props.userId ? (
        <ResponseHost
          requestId={props.requestId}
          userId={props.userId}
          // setMatchList={props.setMatchList}
          matchList={props.matchList}
          teamList={props.teamList}
          teamResId={props.teamResId}
          errorMsg={props.errorMsg}
          responseList={props.responseList}
          requiredPpl={props.requestDetail.requiredPpl}
          status="matched"
        />
      ) : props.requestDetail &&
        props.requestDetail.requesterId !== props.userId ? (
        <ResponseJoined requestId={props.requestId} userId={props.userId} />
      ) : null}
      <RequestDetailSystemComment
        teamList={props.teamList}
        teamResId={props.teamResId}
        requestDetail={props.requestDetail}
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
