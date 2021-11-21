import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavBar from "../../Components/PublicComponents/NavBar";
import {
  searchReq,
  getRequestDetailThunk,
  getBookmarkListThunk,
  bookmarkToggleThunk,
} from "../../Redux/request/actions";

import { Card, CardBody, CardFooter, Tooltip } from "reactstrap";
import { BsStars } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import help from "../../Images/help.png";
import "../SCSS/requestDetail.scss";

const RequestDetail = (props) => {
  const { requestDetail, bookmarkList } = useSelector(
    (state) => state.requestStore
  );
  const [gradeColor, setGradeColor] = useState("");
  const requestId = localStorage.getItem("requestId");
  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("request id: ", requestId);
    console.log("user id: ", userId);
    dispatch(getRequestDetailThunk(requestId, userId));
  }, [dispatch, requestId, userId]);

  useEffect(() => {
    switch (requestDetail.requesterGrade) {
      case "S":
        setGradeColor("#fac77c");
        break;
      case "A":
        setGradeColor("#fa7c92");
        break;
      case "B":
        setGradeColor("#7c97fa");
        break;
      case "C":
        setGradeColor("#52b46e");
        break;
      case "D":
        setGradeColor("#152e87");
        break;
      case "E":
        setGradeColor("#875915");
        break;
      case "F":
        setGradeColor("#333333");
        break;
      default:
        setGradeColor("#c4c4c4");
        break;
    }
  }, [requestDetail.requesterGrade]);

  useEffect(() => {
    dispatch(getBookmarkListThunk(userId));
    console.log(bookmarkList);
  }, [userId, dispatch]);

  const handleBookmark = (bookmarked) => {
    dispatch(bookmarkToggleThunk(requestId, userId, bookmarked));
  };

  const handleSearch = (val) => {
    history.push("/");
    dispatch(searchReq(val));
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
      <div className="container">
        <Card className="request-detail-card mx-auto">
          <CardBody className="p-0">
            <div className="row g-0 m-0 p-0">
              <div className="request-photo mx-auto col-md-5 col-sm-12 col-xs-12">
                <img src={help} alt="request" />
              </div>
              <div className="request-main mx-auto col-md-7 col-sm-12 col-xs-12 p-3">
                <div className="py-2">
                  <span
                    className="dot text-center me-2"
                    style={{ backgroundColor: gradeColor }}
                  >
                    {requestDetail.requesterGrade}
                  </span>
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
                <div className="request-detail-footer py-3">
                  <div>
                    <FaCoins className="mx-1 coin" />
                    <span className="coin me-2">{requestDetail.reward}</span>
                    <BsFillPersonPlusFill className="mx-1 person person-icon" />
                    <span className="person me-2">
                      {requestDetail.requiredPpl}
                    </span>
                    <HiLocationMarker className="mx-1 district district-icon" />
                    <span className="district">{requestDetail.district}</span>
                    <span className="bookmark p-2">
                      {bookmarkList &&
                      bookmarkList.includes(requestDetail.id) ? (
                        <>
                          <AiFillHeart
                            className="bookmark-icon-true fs-1"
                            onClick={() => {
                              handleBookmark(true);
                            }}
                          />
                          {/* <Tooltip
                          flip
                          // target={"bm" + request.requestId}
                          toggle={function noRefCheck() {}}
                        >
                          Bookmark Me!
                        </Tooltip> */}
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
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RequestDetail;
