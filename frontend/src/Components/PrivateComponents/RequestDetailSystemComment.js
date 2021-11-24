import RequestMessage from "./RequestMessage";

const RequestDetailSystemComment = (props) => {
  return (
    <>
      <RequestMessage
        teamList={props.teamList}
        requestDetail={props.requestDetail}
        systemWelcomeMsg={true}
      />
    </>
  );
};

export default RequestDetailSystemComment;
