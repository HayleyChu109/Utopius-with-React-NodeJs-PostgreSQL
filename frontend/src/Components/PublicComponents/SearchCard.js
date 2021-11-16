import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Card, CardBody, CardFooter } from "reactstrap";
import { AiFillHeart } from "react-icons/ai";

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
                alt="request-photo"
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
                <div>
                  Detail :<br />
                  {request.detail}
                </div>
                <div>
                  {request.tag.map((tagname) => (
                    <span key={tagname} className="mx-1 tagname">
                      #{tagname}
                    </span>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="search-card-footer">
                <div className="search-card-footer-info">
                  <span className="mx-3">{request.reward}</span>
                  <span className="mx-3">{request.requiredPpl}</span>
                  <span className="mx-3">{request.district}</span>
                  <span className="bookmark">
                    <AiFillHeart
                      id={"bm" + request.id}
                      onClick={(e) => {
                        handleBookmark(e.currentTarget.id);
                      }}
                    />
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
