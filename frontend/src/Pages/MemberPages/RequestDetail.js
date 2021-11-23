import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import NavBar from "../../Components/PublicComponents/NavBar";
import {
  getRequestDetailThunk,
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
  const { requestDetail } = useSelector((state) => state.requestStore);
  const [gradeColor, setGradeColor] = useState("");
  const requestId = localStorage.getItem("requestId");
  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();

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

  const handleBookmark = (requestId, userId) => {
    dispatch(bookmarkToggleThunk(requestId, userId));
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
        <Card className="request-detail-card">
          <CardBody className="p-0">
            <div className="row g-0 m-0 p-0">
              <div className="request-photo col-md-5 col-sm-12 col-xs-12">
                <img src={help} alt="request" />
              </div>
              <div className="request-main col-md-7 col-sm-12-col-xs-12 p-5">
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
                <div className="request-detail-title pt-4 pb-2">
                  {requestDetail.title}
                </div>
                <div className="request-detail-detail pt-2 pb-4">
                  {requestDetail.detail}
                </div>
                <div className="request-detail-tag">
                  {requestDetail.tag && requestDetail.tag.length > 0
                    ? requestDetail.tag.map((tag) => (
                        <span key={tag.tagName} className="me-2">
                          #{tag.tagName}
                        </span>
                      ))
                    : requestDetail.tag}
                </div>
                <div className="request-detail-footer pt-4">
                  <div className="search-card-footer-info">
                    <FaCoins className="mx-2 coin" />
                    <span className="coin me-2">{requestDetail.reward}</span>
                    <BsFillPersonPlusFill className="mx-2 person person-icon" />
                    <span className="person me-2">
                      {requestDetail.requiredPpl}
                    </span>
                    <HiLocationMarker className="mx-2 district district-icon" />
                    <span className="district">{requestDetail.district}</span>
                    <span className="bookmark p-2">
                      {requestDetail.bookmark ? (
                        <>
                          <AiFillHeart
                            className="bookmark-icon-true fs-1"
                            // onClick={() => {
                            //   handleBookmark(request.requestId);
                            // }}
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
                        <AiFillHeart
                          className="bookmark-icon-false fs-1"
                          // onClick={() => {
                          //   handleBookmark(request.requestId);
                          // }}
                        />
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
