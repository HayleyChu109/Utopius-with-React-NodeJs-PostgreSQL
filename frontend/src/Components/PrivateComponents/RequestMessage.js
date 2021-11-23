import { useHistory } from "react-router-dom";
import moment from "moment";

import GradeBall from "../PublicComponents/GradeBall";

import { Card, CardBody } from "reactstrap";
import "../../Pages/SCSS/requestComment.scss";

const RequestMessage = (props) => {
  const history = useHistory();

  const handleFellow = (fellowId) => {
    history.push(`/member/fellow/${fellowId}`);
  };

  return (
    <>
      {props.comment ? (
        <Card className="request-message-card mx-auto my-3">
          <CardBody className="pt-1">
            <div className="position-relative d-flex align-items-start">
              <div className="req-msg-card-propic">
                <img
                  src={props.comment.commenterProfilePath}
                  alt="profile"
                  className="req-msg-cmter-img image-fluid"
                />
              </div>
              <div className="req-msg-body">
                <div className="username-id mt-2 mb-1">
                  <span className="comment-no me-2">#{props.index}</span>
                  <GradeBall grade={props.comment.commenterGrade} />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFellow(props.comment.commenterId);
                    }}
                    className="comment-username-id"
                  >
                    {props.comment.commenterUsername} UID#
                    {props.comment.commenterId}
                  </span>
                </div>
                <div className="pt-2">
                  {props.comment.detail
                    ? props.comment.detail.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : null}
                </div>
                <div className="comment-time pt-2 m-0">
                  {moment(props.comment.created_at).startOf("hour").fromNow()}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : props.response ? (
        <Card className="request-message-card mx-auto my-3">
          <CardBody className="pt-1">
            <div className="position-relative d-flex align-items-start">
              <div className="req-msg-card-propic">
                <img
                  src={props.response.responserProfilePath}
                  alt="profile"
                  className="req-msg-cmter-img image-fluid"
                />
              </div>
              <div className="req-msg-body">
                <div className="username-id mt-2 mb-1">
                  <span className="comment-no me-2">#{props.index}</span>
                  <GradeBall grade={props.response.responserGrade} />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFellow(props.response.responserId);
                    }}
                    className="comment-username-id"
                  >
                    {props.response.responserUsername} UID#
                    {props.response.responserId}
                  </span>
                </div>
                <div className="pt-2">
                  {props.response.detail
                    ? props.response.detail.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : null}
                </div>
                <div className="comment-time pt-2 m-0">
                  {moment(props.response.created_at).startOf("hour").fromNow()}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};

export default RequestMessage;
