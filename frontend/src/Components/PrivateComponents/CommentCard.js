import React from "react";
import GradeBall from "../PublicComponents/GradeBall";

import { Card, CardBody } from "reactstrap";
import "../../Pages/SCSS/commentCard.scss";

function CommentCard(props) {
  const review = props.review;

  return (
    <>
      <div className="mb-3">
        <Card className="comment-card">
          <CardBody className="p-0">
            <div className="d-flex">
              <div className="container-fluid row g-0">
                <div className="col-lg-1 text-center">
                  <img src={review.profilePath} alt="Profile pic" />
                </div>
                <div className="col-lg-11 comment-card-body">
                  <div className="mt-3 ms-5 ps-2">
                    <GradeBall grade={review.grade} />
                    <span>
                      {review.username} UID#{review.reviewerId}
                    </span>
                  </div>
                  <p className="mt-3 ms-5 ps-2">
                    Rating: <span className="rating">{review.rating}</span>
                  </p>
                  <p className="ms-5 ps-2">
                    Review: <br /> {review.ratingComment}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default CommentCard;
