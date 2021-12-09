import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import NavBar from "../../Components/PublicComponents/NavBar";
import GradeBall from "../../Components/PublicComponents/GradeBall";
import SuccessModal from "../../Components/PublicComponents/SuccessModal";
import RequestDetailNav from "../../Components/PrivateComponents/RequestDetailNav";
import RequestDetailComment from "../../Components/PrivateComponents/RequestDetailComment";
import ResponseJoined from "../../Components/PrivateComponents/ResponseJoined";
import ResponseHost from "../../Components/PrivateComponents/ResponseHost";
import RequestMeetup from "../../Components/PrivateComponents/RequestMeetup";
import NewReview from "../../Components/PrivateComponents/NewReview";
import Discover from "../../Components/PublicComponents/Discover";
import Footer from "../../Components/PublicComponents/Footer";
import {
  searchReq,
  clearMessage,
  getRequestDetailThunk,
  getBookmarkListThunk,
  bookmarkToggleThunk,
  getCommentThunk,
  postNewCommentThunk,
  postNewResponseThunk,
  getResponseListThunk,
  putNewResponseThunk,
  deleteResponseThunk,
  putMatchedResponseThunk,
  getTeamListThunk,
  getReviewInfoThunk,
} from "../../Redux/request/actions";

import { Card, CardBody, CardFooter, Button } from "reactstrap";
import { BsStars } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import "../SCSS/requestDetail.scss";

const RequestDetail = () => {
  const {
    bookmarkList,

    requestDetail,
    requestStatusMessage,

    responseList,
    editSuccessMsg,
    deleteSuccessMsg,
    matchSuccessMsg,

    teamList,

    notReviewed,
    reviewSuccessMsg,
  } = useSelector((state) => state.requestStore);
  /* Notes to the states from store:
  requestDetail: Contains all the request body info
  bookmarkList: Users bookmark
  responseList: All the received responses
  teamList: All the matched res with responser's info
  teamResId: All the matched response id
  matchSuccessMsg: System message returned from server after putting match
  */

  const [footerColor, setFooterColor] = useState("");
  // For posting comments
  const [publicComment, setPublicComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");
  // For posting responses
  const [responseMsg, setResponseMsg] = useState("");
  // For editing response
  const [editRes, setEditRes] = useState(false);
  const [editSuccessBoolean, setEditSuccessBoolean] = useState(false);
  // For deleting response
  const [responseModalBoolean, setResponseModalBoolean] = useState(false);
  // For matching response
  const [matchList, setMatchList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalBoolean, setModalBoolean] = useState(false);
  // For review
  const [reviewModalBoolean, setReviewModalBoolean] = useState(false);

  const { requestId } = useParams();
  const { tab } = useParams();

  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();
  const history = useHistory();

  // Dispatch thunk to get all necessary data
  useEffect(() => {
    dispatch(getRequestDetailThunk(requestId, userId));
    dispatch(getBookmarkListThunk(userId));
    dispatch(getCommentThunk(requestId, false));
    dispatch(getCommentThunk(requestId, true));
    dispatch(getResponseListThunk(requestId));
    dispatch(getTeamListThunk(requestId));
    dispatch(getReviewInfoThunk(requestId, userId));
  }, [
    dispatch,
    userId,
    requestId,
    requestStatusMessage,
    editSuccessMsg,
    deleteSuccessMsg,
    matchSuccessMsg,
    reviewSuccessMsg,
    tab,
  ]);

  // Prevent user entering wrong path
  useEffect(() => {
    // if the user = requester
    if (requestDetail.requesterId === userId) {
      setFooterColor("#fe7235");
      switch (tab) {
        case "join":
          history.push(`/member/request/detail/${requestId}/comment`);
          break;
        case "joined":
          history.push(`/member/request/detail/${requestId}/comment`);
          break;
        case "meetup":
          if (!teamList || teamList.length < 1) {
            history.push(`/member/request/detail/${requestId}/response`);
          }
          break;
        case "response":
          if (teamList && teamList.length > 0) {
            history.push(`/member/request/detail/${requestId}/meetup`);
          }
          break;
        default:
          return;
      }
    } else {
      setFooterColor("#0077ff");
      switch (tab) {
        case "join":
          // Already responded
          if (
            responseList.length > 0 &&
            responseList.map((res) => res.responserId).includes(userId)
          ) {
            history.push(`/member/request/detail/${requestId}/joined`);
          }
          // Req status matched and user in the team
          else if (
            teamList.length > 0 &&
            teamList.map((team) => team.responserId).includes(userId)
          ) {
            history.push(`/member/request/detail/${requestId}/meetup`);
          }
          // Req status matched and user is NOT in the team
          else if (
            teamList.length > 0 &&
            teamList.map((team) => team.responserId).indexOf(userId) === -1
          ) {
            history.push(`/member/request/detail/${requestId}/comment`);
          }
          break;
        case "joined":
          // Not yet joined
          if (
            !responseList ||
            responseList.map((res) => res.responserId).indexOf(userId) === -1
          ) {
            history.push(`/member/request/detail/${requestId}/join`);
          }
          // Req status matched and user is in the team
          else if (
            teamList.length > 0 &&
            teamList.map((team) => team.responserId).includes(userId)
          ) {
            history.push(`/member/request/detail/${requestId}/meetup`);
          }
          // Req status matched and user is NOT in the team
          else if (
            teamList.length > 0 &&
            teamList.map((team) => team.responserId).indexOf(userId) === -1
          ) {
            history.push(`/member/request/detail/${requestId}/comment`);
          }
          break;
        case "response":
          history.push(`/member/request/detail/${requestId}/comment`);
          break;
        case "meetup":
          // Req status not matched
          if (
            requestDetail.status === "cancelled" ||
            requestDetail.status === "open"
          ) {
            history.push(`/member/request/detail/${requestId}/comment`);
          }
          // Req status matched but member is not in the team
          else if (
            teamList.length > 0 &&
            teamList.map((team) => team.responserId).indexOf(userId) === -1
          ) {
            history.push(`/member/request/detail/${requestId}/comment`);
          }
          break;
        default:
          return;
      }
    }
  }, [
    dispatch,
    history,
    tab,
    requestId,
    userId,
    requestDetail,
    responseList,
    teamList,
    requestStatusMessage,
  ]);

  // Modal toggle
  useEffect(() => {
    if (matchSuccessMsg !== "") {
      setModalBoolean(true);
    } else if (deleteSuccessMsg !== "") {
      setResponseModalBoolean(true);
    } else if (editSuccessMsg !== "") {
      setEditSuccessBoolean(true);
    }
    if (requestDetail.status === "completed" && notReviewed) {
      setReviewModalBoolean(true);
    }
  }, [
    dispatch,
    matchSuccessMsg,
    deleteSuccessMsg,
    editSuccessMsg,
    notReviewed,
    requestDetail,
  ]);

  // Close success modal
  const closeModal = () => {
    if (modalBoolean) {
      // Modal for confirm match
      setModalBoolean(false);
      history.push(`/member/request/detail/${requestId}/meetup`);
      // Hotfix for not pushing member to the meetup
      window.location.reload();
    } else if (responseModalBoolean) {
      // Modal for success delete response
      setResponseModalBoolean(false);
      history.push(`/member/request/detail/${requestId}/comment`);
    } else if (editSuccessBoolean) {
      // Modal for success edit response
      setEditSuccessBoolean(false);
    } else if (reviewModalBoolean) {
      // Modal for success review
      setReviewModalBoolean(false);
    }
    dispatch(clearMessage());
  };

  // // Close modal when receive success message
  useEffect(() => {
    if (reviewSuccessMsg !== "") {
      setReviewModalBoolean(false);
      history.push(`/member/request/detail/${requestId}/comment`);
    }
  }, [history, requestId, requestDetail, reviewSuccessMsg]);

  // Bookmark toggle function
  const handleBookmark = (bookmarked) => {
    dispatch(bookmarkToggleThunk(requestId, userId, bookmarked));
  };

  // Visit member profile when clicked
  const handleFellow = (fellowId) => {
    history.push(`/member/fellow/${fellowId}`);
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

  // Submit new comment
  const submitComment = (type) => {
    if (type) {
      if (privateComment !== "") {
        dispatch(postNewCommentThunk(requestId, userId, privateComment, type));
        setPrivateComment("");
      }
    } else {
      if (publicComment !== "") {
        dispatch(postNewCommentThunk(requestId, userId, publicComment, type));
        setPublicComment("");
      }
    }
  };

  // Submit new response
  const submitResponse = () => {
    dispatch(postNewResponseThunk(requestId, userId, responseMsg));
    setResponseMsg("");
  };

  // Edit response
  const editResponse = () => {
    dispatch(putNewResponseThunk(requestId, userId, responseMsg));
    setResponseMsg("");
    setEditRes(false);
  };

  // Delete response
  const deleteResponse = () => {
    dispatch(deleteResponseThunk(requestId, userId));
  };

  // Matching response
  const handleMatch = (newMatchId) => {
    setErrorMsg("");
    if (matchList && matchList.length > 0 && matchList.includes(newMatchId)) {
      let newMatch = matchList.filter((resId) => resId !== newMatchId);
      setMatchList(newMatch);
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

  // Submit matched response
  const submitMatch = () => {
    setErrorMsg("");
    if (matchList.length < 1) {
      setErrorMsg(
        `Please match at least 1 response ! ( ${matchList.length} / ${requestDetail.requiredPpl} response matched )`
      );
    } else {
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
                <img src={requestDetail.reqPhotoPath} alt="request" />
              </div>
              <div className="request-main mx-auto col-md-7 col-sm-12 col-xs-12 px-3 pt-3 position-relative">
                <div className="py-2">
                  <div
                    className="username-id"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFellow(requestDetail.requesterId);
                    }}
                  >
                    <GradeBall grade={requestDetail.requesterGrade} />
                    <span className="requester-username me-3">
                      {requestDetail.requesterUsername}
                    </span>
                    <span className="requester-id">
                      UID#{requestDetail.requesterId}
                    </span>
                  </div>
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
            <RequestDetailNav userId={userId} handleTab={handleTab} />
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
                  matchList={matchList}
                  errorMsg={errorMsg}
                />
              ) : tab === "response" ? (
                <ResponseHost
                  requestId={requestId}
                  matchList={matchList}
                  setMatchList={setMatchList}
                  handleMatch={handleMatch}
                  errorMsg={errorMsg}
                  status="open"
                />
              ) : tab === "join" ? (
                <>
                  <div className="response-matching-bg">
                    <div className="response-form response-matching-msg">
                      <div className="response-form p-2 mx-auto">
                        <div className="response-heading pt-3 pb-1">
                          Create Response
                        </div>
                        <div
                          className="response-matching-helper pb-2"
                          style={{ color: "#ff6161" }}
                        >
                          Only you and the requester can see this note
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="response-form p-4 mx-auto">
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
                </>
              ) : tab === "joined" ? (
                <ResponseJoined
                  requestId={requestId}
                  userId={userId}
                  editRes={editRes}
                  setResponseMsg={setResponseMsg}
                />
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
                  {requestDetail.status === "cancelled" ||
                  requestDetail.status === "completed" ? (
                    <input
                      className="input-message form-control"
                      placeholder="Leave a comment.."
                      value={publicComment}
                      disabled
                    />
                  ) : (
                    <input
                      className="input-message form-control"
                      placeholder="Leave a comment.."
                      value={publicComment}
                      onChange={(e) => {
                        setPublicComment(e.currentTarget.value);
                      }}
                    />
                  )}
                </div>
                {requestDetail.status === "cancelled" ||
                requestDetail.status === "completed" ? (
                  <div className="col-2">
                    {requestDetail.requesterId === userId ? (
                      <Button className="btn-white-orange-sm">SEND</Button>
                    ) : (
                      <Button className="btn-white-blue-sm">SEND</Button>
                    )}
                  </div>
                ) : (
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
                )}
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
                  {editRes ? (
                    <>
                      <Button
                        className="btn-white-blue-sm mx-2"
                        onClick={editResponse}
                      >
                        SUBMIT
                      </Button>
                      <Button
                        className="btn-white-blue-sm mx-2"
                        onClick={() => {
                          setEditRes(false);
                        }}
                      >
                        DISPOSE
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn-white-blue-sm mx-2"
                        onClick={() => {
                          setEditRes(true);
                        }}
                      >
                        EDIT
                      </Button>
                      <Button
                        className="btn-white-blue-sm mx-2"
                        onClick={deleteResponse}
                      >
                        DELETE
                      </Button>
                    </>
                  )}
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
                  {requestDetail.status === "matched" ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {requestDetail.requesterId === userId ? (
                        <Button className="btn-white-orange-sm">SEND</Button>
                      ) : (
                        <Button className="btn-white-blue-sm">SEND</Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </CardFooter>
        </Card>
      </div>
      <div className="text-center my-3">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
      <Discover />
      <Footer />
      <SuccessModal
        isOpen={modalBoolean}
        close={closeModal}
        message={matchSuccessMsg}
      />
      <SuccessModal
        isOpen={responseModalBoolean}
        close={closeModal}
        message={deleteSuccessMsg}
      />
      <SuccessModal
        isOpen={editSuccessBoolean}
        close={closeModal}
        message={editSuccessMsg}
      />
      {requestDetail.requesterId === userId ||
      teamList.map((team) => team.responserId).includes(userId) ? (
        <NewReview
          isOpen={reviewModalBoolean}
          close={closeModal}
          requestId={requestId}
          setReviewModalBoolean={setReviewModalBoolean}
        />
      ) : null}
    </>
  );
};

export default RequestDetail;
