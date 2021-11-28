// import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchReq } from "../../Redux/request/actions";
import jwt_decode from "jwt-decode";

import { bookmarkToggleThunk } from "../../Redux/request/actions";
import GradeBall from "./GradeBall";

import { Card, CardBody, CardFooter } from "reactstrap";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import "../../Pages/SCSS/searchCard.scss";

const SearchCard = ({ request, handleClick }) => {
  const { bookmarkList } = useSelector((state) => state.requestStore);

  let token = localStorage.getItem("token");
  let userId;
  if (token) {
    userId = jwt_decode(token).id;
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const handleMember = (memberId) => {
    if (memberId === userId) {
      history.push("/member/profile");
    } else {
      history.push(`/member/fellow/${memberId}`);
    }
  };

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  const handleBookmark = (bookmarked) => {
    dispatch(bookmarkToggleThunk(request.id, userId, bookmarked));
  };

  return (
    <>
      <div className="col-md-6 col-sm-12 col-xs-12 p-4">
        <Card
          className="search-req-card"
          onClick={() => {
            handleClick(request.id);
          }}
        >
          <div className="row g-0">
            <div className="search-card-photo col-5">
              <img
                src={request.reqPhotoPath}
                className="img-fluid rounded-start"
                alt="request"
              />
            </div>
            <div className="search-card-main col-7">
              <CardBody>
                <div
                  className="username-id"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMember(request.requesterId);
                  }}
                >
                  <GradeBall grade={request.grade} />
                  {request.username} UID#{request.requesterId}
                </div>
                <div className="createdAt">{request.created_at}</div>
                <div className="search-card-req-title">{request.title}</div>
                <div className="search-card-req-detail">{request.detail}</div>
                <div className="search-card-req-tag">
                  {request.tag.map((tagname) => (
                    <span
                      key={tagname}
                      className="mx-1 tagname"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch(tagname.replace(/\s/g, ""));
                      }}
                    >
                      #{tagname}
                    </span>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="search-card-footer">
                <div>
                  <FaCoins className="mx-1 coin" />
                  <span className="coin me-1">{request.reward}</span>
                  <BsFillPersonPlusFill className="mx-1 person person-icon" />
                  <span className="person me-1">{request.requiredPpl}</span>
                  <HiLocationMarker className="mx-1 district district-icon" />
                  <span className="district">{request.district}</span>
                  <span className="bookmark">
                    {bookmarkList && bookmarkList.includes(request.id) ? (
                      <>
                        <AiFillHeart
                          className="bookmark-icon-true"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(true);
                          }}
                        />
                      </>
                    ) : (
                      <AiFillHeart
                        className="bookmark-icon-false"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(false);
                        }}
                      />
                    )}
                  </span>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SearchCard;
