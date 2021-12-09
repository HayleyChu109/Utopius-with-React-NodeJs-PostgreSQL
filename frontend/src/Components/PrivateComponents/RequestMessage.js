import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import FadeIn from "react-fade-in";
import jwt_decode from "jwt-decode";

import GradeBall from "../PublicComponents/GradeBall";

import { Card, CardBody, CardFooter, Button } from "reactstrap";
import { BsFillPersonPlusFill } from "react-icons/bs";
import help from "../../Images/help.png";
import "../../Pages/SCSS/requestComment.scss";

const RequestMessage = (props) => {
  const { responseList, teamResId, teamList } = useSelector(
    (state) => state.requestStore
  );

  const history = useHistory();

  // Visit member profile
  let memberId = jwt_decode(localStorage.getItem("token")).id;

  const handleFellow = (fellowId) => {
    if (fellowId === memberId) {
      history.push("/member/profile");
    } else {
      history.push(`/member/fellow/${fellowId}`);
    }
  };

  return (
    <>
      {props.comment ? (
        <FadeIn>
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
                    {moment(props.comment.created_at)
                      .startOf("second")
                      .fromNow()}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      ) : props.response ? (
        <FadeIn>
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
                    {/* <span className="comment-no me-2">#{props.index}</span> */}
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
                    {moment(props.response.created_at)
                      .startOf("second")
                      .fromNow()}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      ) : responseList && props.status === "open" ? (
        <div>
          {responseList.map((res, index) => (
            <FadeIn>
              <Card className="request-message-card mx-auto my-3" key={res.id}>
                <CardBody className="pt-1">
                  <div className="position-relative d-flex align-items-start">
                    <div className="req-msg-card-propic">
                      <img
                        src={res.responserProfilePath}
                        alt="profile"
                        className="req-msg-cmter-img image-fluid"
                      />
                    </div>
                    <div className="req-msg-body">
                      <div className="username-id mt-2 mb-1">
                        <span className="comment-no me-2">#{index + 1}</span>
                        <GradeBall grade={res.responserGrade} />
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFellow(res.responserId);
                          }}
                          className="comment-username-id"
                        >
                          {res.responserUsername} UID#
                          {res.responserId}
                        </span>
                      </div>
                      <div className="pt-2">
                        {res.detail
                          ? res.detail.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))
                          : null}
                      </div>
                      <div className="comment-time pt-2 m-0">
                        {moment(res.created_at).startOf("second").fromNow()}
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="res-match-footer request-detail-footer">
                  <div className="text-center mb-2">
                    {props.matchList &&
                    props.matchList.length > 0 &&
                    props.matchList.includes(res.id) ? (
                      <Button
                        className="btn-white-blue-sm"
                        onClick={() => {
                          props.handleMatch(res.id);
                        }}
                      >
                        MATCHED
                      </Button>
                    ) : (
                      <Button
                        className="btn-white-orange-sm"
                        onClick={() => {
                          props.handleMatch(res.id);
                        }}
                      >
                        MATCH !
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      ) : responseList && props.status === "matched" ? (
        <div>
          {responseList.map((res, index) => (
            <FadeIn>
              <Card className="request-message-card mx-auto my-3" key={res.id}>
                <CardBody className="pt-1">
                  <div className="position-relative d-flex align-items-start">
                    <div className="req-msg-card-propic">
                      <img
                        src={res.responserProfilePath}
                        alt="profile"
                        className="req-msg-cmter-img image-fluid"
                      />
                    </div>
                    <div className="req-msg-body">
                      <div className="username-id mt-2 mb-1">
                        <span className="comment-no me-2">#{index + 1}</span>
                        <GradeBall grade={res.responserGrade} />
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFellow(res.responserId);
                          }}
                          className="comment-username-id"
                        >
                          {res.responserUsername} UID#
                          {res.responserId}
                        </span>
                      </div>
                      <div className="pt-2">
                        {res.detail
                          ? res.detail.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))
                          : null}
                      </div>
                      <div className="comment-time pt-2 m-0">
                        {moment(res.created_at).startOf("second").fromNow()}
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="res-match-footer request-detail-footer">
                  <div className="text-center mb-2">
                    {teamResId &&
                    teamResId.length > 0 &&
                    teamResId.includes(res.id) ? (
                      <Button className="btn-white-blue-sm">MATCHED</Button>
                    ) : null}
                  </div>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      ) : props.systemWelcomeMsg ? (
        <FadeIn>
          <Card className="request-message-card mx-auto my-3">
            <CardBody className="pt-1">
              <div className="position-relative d-flex align-items-start">
                <div className="req-msg-card-propic">
                  <img
                    src={help}
                    alt="profile"
                    className="req-msg-cmter-img image-fluid"
                  />
                </div>
                <div className="req-msg-body">
                  <div className="username-id mt-2 mb-1">
                    <span className="comment-no me-2">#0</span>
                    <GradeBall grade={"S"} />
                    <span className="comment-username-id">UTOPIUS</span>
                  </div>
                  <div className="pt-2">
                    Congratulations ! You are the chosen one !<br />
                    Here are your team members :<br />
                    <div className="msgModal my-2">
                      Request Host :
                      <span className="username-id">
                        <span className="ms-2">
                          <GradeBall
                            grade={props.requestDetail.requesterGrade}
                          />
                        </span>
                        <span className="me-2">
                          {props.requestDetail.requesterUsername}
                        </span>
                        <span className="me-2">
                          UID#{props.requestDetail.requesterId}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="person">Responser :</span>
                      <BsFillPersonPlusFill className="ms-1 pb-1 fs-4 person person-icon" />
                      <span className="ms-1 person">{teamList.length}</span>
                      <br />
                      {teamList && teamList.length > 0
                        ? teamList.map((res) => (
                            <div key={res.id} className="my-1 username-id-res">
                              <GradeBall grade={res.responserGrade} />
                              <span
                                className="me-2 "
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFellow(res.responserId);
                                }}
                              >
                                {res.responserUsername}
                              </span>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFellow(res.responserId);
                                }}
                              >
                                UID#{res.responserId}
                              </span>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      ) : null}
    </>
  );
};

export default RequestMessage;
