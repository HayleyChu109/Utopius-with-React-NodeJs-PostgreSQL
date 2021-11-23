import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavBar from "../../Components/PublicComponents/NavBar";
import GradeBall from "../../Components/PublicComponents/GradeBall";
import RequestDetailNav from "../../Components/PrivateComponents/RequestDetailNav";
import RequestDetailComment from "../../Components/PrivateComponents/RequestDetailComment";
import ResponseForm from "../../Components/PrivateComponents/ResponseForm";
import {
  searchReq,
  getRequestDetailThunk,
  getBookmarkListThunk,
  bookmarkToggleThunk,
  postNewCommentThunk,
  getResponseListThunk,
  postNewResponseThunk,
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
  const { requestDetail, bookmarkList, responseList } = useSelector(
    (state) => state.requestStore
  );
  const [footerColor, setFooterColor] = useState("");
  const [displaySection, setDisplaySection] = useState("publicComment");
  const [publicComment, setPublicComment] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const { requestId } = useParams();
  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("request id: ", requestId);
    console.log("user id: ", userId);
    dispatch(getRequestDetailThunk(requestId, userId));
  }, [dispatch, requestId, userId]);

  useEffect(() => {
    dispatch(getBookmarkListThunk(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getResponseListThunk(requestId));
  }, [requestId, dispatch]);

  useEffect(() => {
    if (requestDetail.requesterId === userId) {
      setFooterColor("#fe7235");
    } else {
      setFooterColor("#0077ff");
    }
  }, [requestDetail, userId]);

  const handleBookmark = (bookmarked) => {
    dispatch(bookmarkToggleThunk(requestId, userId, bookmarked));
  };

  const handleSearch = (val) => {
    history.push("/");
    dispatch(searchReq(val));
  };

  const submitPublicComment = (type) => {
    dispatch(postNewCommentThunk(requestId, userId, publicComment, type));
    setPublicComment("");
  };

  const submitResponse = () => {
    dispatch(postNewResponseThunk(requestId, userId, responseMsg));
    setResponseMsg("");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="m-4 new-search-title">
          <BsStars className="mb-1 me-2" />
          REQUEST DETAIL : <span className="me-3">{requestDetail.title}</span>
          <span>(Request #{requestDetail.id})</span>
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
                  <GradeBall grade={requestDetail.requesterGrade} />
                  <span className="requester-username me-3">
                    {requestDetail.requesterUsername}
                  </span>
                  <span className="requester-id">
                    #UID {requestDetail.requesterId}
                  </span>
                </div>
                <div className="request-detail-createdAt py-2">
                  Created at : {requestDetail.createdAt}
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
              setDisplaySection={setDisplaySection}
            />
            <div className="requset-detail-cmres">
              {displaySection === "publicComment" ? (
                <RequestDetailComment
                  requestId={requestId}
                  userId={userId}
                  type={false}
                />
              ) : displaySection === "privateComment" ? (
                <RequestDetailComment
                  requestId={requestId}
                  userId={userId}
                  type={true}
                />
              ) : displaySection === "response" ? (
                <div>This is the response list</div>
              ) : displaySection === "join" ? (
                <ResponseForm
                  requestId={requestId}
                  userId={userId}
                  setResponseMsg={setResponseMsg}
                  responseList={responseList}
                />
              ) : null}
            </div>
          </CardBody>
          <CardFooter
            className="request-detail-footer"
            style={{ backgroundColor: footerColor }}
          >
            {displaySection === "publicComment" ? (
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
                        submitPublicComment(false);
                      }}
                    >
                      SEND
                    </Button>
                  ) : (
                    <Button
                      className="btn-white-blue-sm"
                      onClick={() => {
                        submitPublicComment(false);
                      }}
                    >
                      SEND
                    </Button>
                  )}
                </div>
              </div>
            ) : displaySection === "response" ? (
              <div className="text-center my-2 row d-flex align-items-center justify-content-center">
                <div>
                  <Button className="btn-white-orange-sm">CONFIRM</Button>
                </div>
              </div>
            ) : displaySection === "join" ? (
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
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RequestDetail;
