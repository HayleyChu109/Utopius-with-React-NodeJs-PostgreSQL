import ResponseHost from "./ResponseHost";
import ResponseJoined from "./ResponseJoined";
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
          // handleMatch={props.handleMatch}
          errorMsg={props.errorMsg}
          responseList={props.responseList}
          requiredPpl={props.requestDetail.requiredPpl}
          status="matched"
        />
      ) : props.requestDetail &&
        props.requestDetail.requesterId !== props.userId ? (
        <ResponseJoined requestId={props.requestId} userId={props.userId} />
      ) : null}
      <RequestDetailComment
        requestId={props.requestId}
        userId={props.userId}
        type={props.type}
      />
    </>
  );
};

export default RequestMeetup;
