import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../../Components/PublicComponents/NavBar";

import { Card, CardBody, CardFooter, Tooltip } from "reactstrap";
import { BsStars } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import help from "../../Images/help.png";

const RequestDetail = (props) => {
  const { request, search } = useSelector((state) => state.requestStore);

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state);
    } else {
      console.log("No props");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="m-4 new-search-title">
          <BsStars className="mb-1 me-2" />
          SEARCH RESULT FOR : <span>{search.toUpperCase()}</span>
        </div>
      </div>
      <div className="container">
        <Card>
          <CardBody>
            <div className="row">
              <div className="request-photo col-md-5 col-sm-12 col-xs-12">
                <img src={help} />
              </div>
              <div className="request-detail col-md-7 col-sm-12-col-xs-12">
                <div className="username-id">
                  <span
                    className="dot text-center me-2"
                    style={{ background: request.gradeColor }}
                  >
                    {request.grade}
                  </span>
                  {request.username} UID#{request.userId}
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
