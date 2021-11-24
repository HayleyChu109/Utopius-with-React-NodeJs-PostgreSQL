import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import NavBar from "../../Components/PublicComponents/NavBar";
import UserInfoCombo from "../../Components/PublicComponents/UserInfoCombo";
import GradeBall from "../../Components/PublicComponents/GradeBall";
import SuccessModal from "../../Components/PublicComponents/SuccessModal";
import RequestDetailNav from "../../Components/PrivateComponents/RequestDetailNav";
import RequestDetailComment from "../../Components/PrivateComponents/RequestDetailComment";
import ResponseJoined from "../../Components/PrivateComponents/ResponseJoined";
import ResponseHost from "../../Components/PrivateComponents/ResponseHost";
import RequestMeetup from "../../Components/PrivateComponents/RequestMeetup";
import {
  searchReq,
  getRequestDetailThunk,
  getBookmarkListThunk,
  bookmarkToggleThunk,
  postNewCommentThunk,
  postNewResponseThunk,
  getResponseListThunk,
  putMatchedResponseThunk,
  getTeamListThunk,
} from "../../Redux/request/actions";

import { Card, CardBody, CardFooter, Button } from "reactstrap";
import { BsStars } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import help from "../../Images/help.png";
import "../SCSS/requestDetail.scss";

const RequestDetail = (props) => {
  const {
    requestDetail,
    bookmarkList,
    responseList,
    teamList,
    matchSuccessMsg,
  } = useSelector((state) => state.requestStore);
  const [footerColor, setFooterColor] = useState("");
  const [modalBoolean, setModalBoolean] = useState(false);
  const [publicComment, setPublicComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  // For matching response
  const [matchList, setMatchList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const { requestId } = useParams();
  const { tab } = useParams();

  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();
  const history = useHistory();

  // Get the req data
  useEffect(() => {
    console.log("request id: ", requestId);
    console.log("user id: ", userId);
    dispatch(getRequestDetailThunk(requestId, userId));
  }, [dispatch, requestId, userId]);

  // Get the bookmark list to check bookmark status
  useEffect(() => {
    dispatch(getBookmarkListThunk(userId));
  }, [userId, dispatch]);

  // Get the response list
  useEffect(() => {
    dispatch(getResponseListThunk(requestId));
  }, [dispatch, requestId]);

  // Get the team list
  useEffect(() => {
    dispatch(getTeamListThunk(requestId));
  }, [dispatch, requestId])

  // Check if the user is in the req/res side to set footer color
  useEffect(() => {
    if (requestDetail.requesterId === userId) {
      setFooterColor("#fe7235");
    } else {
      setFooterColor("#0077ff");
    }
  }, [requestDetail, userId]);

  useEffect(() => {
    if (matchSuccessMsg !== "") {
      setModalBoolean(true);
    }
  }, [matchSuccessMsg]);

  // Bookmark toggle function
  const handleBookmark = (bookmarked) => {
    dispatch(bookmarkToggleThunk(requestId, userId, bookmarked));
  };

  // Search the tag when clicked
  const handleSearch = (val) => {
    history.push("/");
    dispatch(searchReq(val));
  };

  // Changing tab
  const handleTab = (displayOption) => {
    history.push(`/member/request/detail/${requestId}/${displayOption}`);
  };

  // Close success modal
  const closeModal = () => {
    setModalBoolean(false);
    history.push(`/member/request/detail/${requestId}/meetup`);
  };

  // Matching response
  const handleMatch = (newMatchId) => {
    setErrorMsg("");
    if (matchList && matchList.length > 0 && matchList.includes(newMatchId)) {
      let newMatch = matchList.filter((resId) => resId !== newMatchId);
      setMatchList(newMatch);
      console.log("NewMatch: ", newMatch);
    } else if (matchList.length >= requestDetail.requiredPpl) {
      setErrorMsg(
        `You are reaching the response limit ! ( ${requestDetail.requiredPpl} response )`
      );
    } else {
      let newMatch = matchList.concat([newMatchId]);
      if (newMatch.length >= requestDetail.requiredPpl) {
        setErrorMsg(
          `You are reaching the response limit ! ( ${requestDetail.requiredPpl} response )`
        );
      }
      setMatchList(newMatch);
    }
  };

  // Submit new comment
  const submitComment = (type) => {
    if (type) {
      dispatch(postNewCommentThunk(requestId, userId, privateComment, type));
      setPrivateComment("");
    } else {
      dispatch(postNewCommentThunk(requestId, userId, publicComment, type));
      setPublicComment("");
    }
  };

  // Submit new response
  const submitResponse = () => {
    dispatch(postNewResponseThunk(requestId, userId, responseMsg));
    setResponseMsg("");
    history.push(`/member/request/detail/${requestId}/joined`);
  };

  // Edit response
  const editResponse = () => {
    console.log("Sending edit res thunk..");
    // dispatch(putNewResponseThunk(requestId, userId, responseMsg));
    // setResponseMsg("");
  };

  // Delete response
  const deleteResponse = () => {
    console.log("Sending delete res thunk..");
    // dispatch(deleteResponseThunk(requestId, userId));
  };

  // Submit matched response
  const submitMatch = () => {
    setErrorMsg("");
    if (matchList.length < 1) {
      setErrorMsg(
        `Please match at least 1 response ! ( ${matchList.length} / ${requestDetail.requiredPpl} response matched )`
      );
    } else {
      console.log("Submitting response match..");
      dispatch(putMatchedResponseThunk(matchList, requestId));
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="m-4 new-search-title">
          <BsStars className="mb-1 me-2" />
          REQUEST DETAIL : <span className="me-3">{requestDetail.title}</span>
          <span>(ReqID #{requestDetail.id})</span>
        </div>
      </div>
      <div className="container p-4">
        <Card className="request-detail-card mx-auto">
          <CardBody className="p-0">
            <div className="row g-0 m-0 p-0">
              <div className="request-photo mx-auto col-md-5 col-sm-12 col-xs-12">
                <img src={help} alt="request" />
              </div>
              <div className="request-main mx-auto col-md-7 col-sm-12 col-xs-12 px-3 pt-3 position-relative">
                <div className="py-2">
                  <UserInfoCombo userId={requestDetail.requesterId} />
                </div>
                <div className="request-detail-createdAt py-2">
                  Created at : {moment(requestDetail.createdAt).format("LLL")}
                </div>
                <div className="request-detail-title py-2">
                  {requestDetail.title}
                </div>
                <div className="request-detail-detail pt-2 pb-3">
                  {requestDetail.detail
                    ? requestDetail.detail.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : null}
                </div>
                <div className="request-detail-tag">
                  {requestDetail.tag && requestDetail.tag.length > 0
                    ? requestDetail.tag.map((tag) => (
                        <span
                          key={tag.tagName}
                          className="me-2 request-detail-tag-search"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSearch(tag.tagName.replace(/\s/g, ""));
                          }}
                        >
                          #{tag.tagName}
                        </span>
                      ))
                    : requestDetail.tag}
                </div>
                <div className="request-detail-bottom py-3">
                  <div>
                    <FaCoins className="mx-2 coin" />
                    <span className="coin me-3">{requestDetail.reward}</span>
                    <BsFillPersonPlusFill className="mx-1 person person-icon" />
                    <span className="person me-3">
                      {requestDetail.requiredPpl}
                    </span>
                    <HiLocationMarker className="mx-2 district district-icon" />
                    <span className="district">{requestDetail.district}</span>
                  </div>
                </div>
                <span className="bookmark p-2">
                  {bookmarkList && bookmarkList.includes(requestDetail.id) ? (
                    <>
                      <AiFillHeart
                        className="bookmark-icon-true fs-1"
                        onClick={() => {
                          handleBookmark(true);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <AiFillHeart
                        className="bookmark-icon-false fs-1"
                        onClick={() => {
                          handleBookmark(false);
                        }}
                      />
                    </>
                  )}
                </span>
              </div>
            </div>
            <RequestDetailNav
              userId={userId}
              requestDetail={requestDetail}
              responseList={responseList}
              handleTab={handleTab}
            />
            <div className="requset-detail-cmres">
              {tab === "comment" ? (
                <RequestDetailComment
                  requestId={requestId}
                  userId={userId}
                  type={false}
                />
              ) : tab === "meetup" ? (
                <RequestMeetup
                  requestId={requestId}
                  userId={userId}
                  type={true}
                  requestDetail={requestDetail}
                  matchList={matchList}
                  teamList={teamList}
                  errorMsg={errorMsg}
                  responseList={responseList}
                  requiredPpl={requestDetail.requiredPpl}
                />
              ) : tab === "response" ? (
                <ResponseHost
                  requestId={requestId}
                  userId={userId}
                  setMatchList={setMatchList}
                  matchList={matchList}
                  handleMatch={handleMatch}
                  errorMsg={errorMsg}
                  responseList={responseList}
                  requiredPpl={requestDetail.requiredPpl}
                  status="open"
                />
              ) : tab === "join" ? (
                <div className="response-form p-4 mx-auto">
                  <div className="response-heading px-2 pb-3">
                    CREATE RESPONSE
                  </div>
                  <textarea
                    className="form-control response-ta mx-auto pb-4"
                    placeholder="Join this request and leave a message.."
                    rows="10"
                    maxLength="250"
                    onChange={(e) => {
                      setResponseMsg(e.currentTarget.value);
                    }}
                  ></textarea>
                </div>
              ) : tab === "joined" ? (
                <ResponseJoined requestId={requestId} userId={userId} />
              ) : null}
            </div>
          </CardBody>
          <CardFooter
            className="request-detail-footer"
            style={{ backgroundColor: footerColor }}
          >
            {tab === "comment" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div className="col-6">
                  <input
                    className="input-message form-control"
                    placeholder="Leave a comment.."
                    value={publicComment}
                    onChange={(e) => {
                      setPublicComment(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="col-2">
                  {requestDetail.requesterId === userId ? (
                    <Button
                      className="btn-white-orange-sm"
                      onClick={() => {
                        submitComment(false);
                      }}
                    >
                      SEND
                    </Button>
                  ) : (
                    <Button
                      className="btn-white-blue-sm"
                      onClick={() => {
                        submitComment(false);
                      }}
                    >
                      SEND
                    </Button>
                  )}
                </div>
              </div>
            ) : tab === "response" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div>
                  <Button className="btn-white-orange-sm" onClick={submitMatch}>
                    CONFIRM
                  </Button>
                </div>
              </div>
            ) : tab === "join" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div>
                  <Button
                    className="btn-white-blue-sm"
                    onClick={submitResponse}
                  >
                    SEND
                  </Button>
                </div>
              </div>
            ) : tab === "joined" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div>
                  <Button
                    className="btn-white-blue-sm mx-2"
                    onClick={editResponse}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="btn-white-blue-sm mx-2"
                    onClick={deleteResponse}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            ) : tab === "meetup" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div className="col-6">
                  <input
                    className="input-message form-control"
                    placeholder="Leave a private message to your team.."
                    value={privateComment}
                    onChange={(e) => {
                      setPrivateComment(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="col-2">
                  {requestDetail.requesterId === userId ? (
                    <Button
                      className="btn-white-orange-sm"
                      onClick={() => {
                        submitComment(true);
                      }}
                    >
                      SEND
                    </Button>
                  ) : (
                    <Button
                      className="btn-white-blue-sm"
                      onClick={() => {
                        submitComment(true);
                      }}
                    >
                      SEND
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </CardFooter>
        </Card>
      </div>
      <SuccessModal
        isOpen={modalBoolean}
        close={closeModal}
        message={matchSuccessMsg}
      />
    </>
  );
};

export default RequestDetail;
