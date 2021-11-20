import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchReq } from "../../Redux/request/actions";

import { Card, CardBody, CardFooter, Tooltip } from "reactstrap";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import "../../Pages/SCSS/searchCard.scss";
import help from "../../Images/help.png";

const SearchCard = ({ request, handleBookmark }) => {
  const [gradeColor, setGradeColor] = useState("");
  const [bookmarkColor, setBookmarkColor] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  const showRequestDetail = (requestId) => {
    localStorage.setItem("requestId", requestId);
    history.push(`/member/request/detail/${requestId}`);
  };

  useEffect(() => {
    switch (request.grade) {
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
    }
  }, [request.grade]);

  return (
    <>
      <div className="col-md-6 col-sm-12 col-xs-12 p-4">
        <Card
          className="search-req-card"
          onClick={() => {
            showRequestDetail(request.id);
          }}
        >
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
                <div className="username-id">
                  <span
                    className="dot text-center me-2"
                    style={{ backgroundColor: gradeColor }}
                  >
                    {request.grade}
                  </span>
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
                        e.preventDefault();
                        handleSearch(tagname.replace(/\s/g, ""));
                      }}
                    >
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
                          className="bookmark-icon-true"
                          onClick={() => {
                            handleBookmark(request.requestId);
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
                      <AiFillHeart
                        className="bookmark-icon-false"
                        onClick={() => {
                          handleBookmark(request.requestId);
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
