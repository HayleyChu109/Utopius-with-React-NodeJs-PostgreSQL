// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { Card, CardBody, CardFooter, Tooltip } from "reactstrap";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import "../../Pages/SCSS/searchCard.scss";
import help from "../../Images/help.png";

const SearchCard = ({ request, handleBookmark }) => {
  return (
    <>
      <div className="col-md-6 col-sm-12 col-xs-12 p-4">
        <Card className="search-req-card">
          <div className="row g-0">
            <div className="search-card-photo col-5">
              <img
                src={help}
                className="img-fluid rounded-start"
                alt="request"
              />
            </div>
            <div className="search-card-main col-7">
              <CardBody>
                <div>
                  <span
                    className="dot text-center me-2"
                    style={{ background: request.gradeColor }}
                  >
                    {request.grade}
                  </span>
                  {request.username} #{request.userId}
                </div>
                <div>Created at : {request.createdAt}</div>
                <div className="search-card-req-detail">{request.detail}</div>
                <div className="search-card-req-tag">
                  {request.tag.map((tagname) => (
                    <span key={tagname} className="mx-1 tagname">
                      #{tagname}
                    </span>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="search-card-footer">
                <div className="search-card-footer-info">
                  <FaCoins className="mx-2 coin" />
                  <span className="coin me-2">{request.reward}</span>
                  <BsFillPersonPlusFill className="mx-2 person person-icon" />
                  <span className="person me-2">{request.requiredPpl}</span>
                  <HiLocationMarker className="mx-2 district district-icon" />
                  <span className="district">{request.district}</span>
                  <span className="bookmark">
                    {request.bookmark ? (
                      <>
                        <AiFillHeart
                          id={"bm" + request.requestId}
                          className="bookmark-icon-true"
                          onClick={(e) => {
                            handleBookmark(e.currentTarget.id);
                          }}
                        />
                        <Tooltip
                          flip
                          target={"bm" + request.requestId}
                          toggle={function noRefCheck() {}}
                        >
                          Bookmark Me!
                        </Tooltip>
                      </>
                    ) : (
                      <AiFillHeart
                        id={"bm" + request.id}
                        className="bookmark-icon-false"
                        onClick={(e) => {
                          handleBookmark(e.currentTarget.id);
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
