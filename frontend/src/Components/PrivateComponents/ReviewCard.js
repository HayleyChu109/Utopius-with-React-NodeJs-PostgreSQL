import { useState, useEffect } from "react";

import GradeBall from "../PublicComponents/GradeBall";

import { Card, CardBody, Input } from "reactstrap";
import "../../Pages/SCSS/review.scss";

function ReviewCard({
  requestId,
  userId,
  reviewee,
  requesterCard,
  revieweeId,
  setReviewObj,
  reviewObj,
  // setReviewContribute,
  // setReviewInfo,
  // setReviewDetail,
}) {
  const handleChange = (target) => {
    let reviewCopy = reviewObj;
    // setReviewObj({
    //   ...reviewCopy,
    //   [revieweeId]: {
    //     requestId: requestId,
    //     reviewerId: userId,
    //     revieweeId: revieweeId,
    //   },
    // });
    let reviewEleCopy = reviewObj[revieweeId];
    switch (target.type) {
      case "checkbox":
        setReviewObj({
          ...reviewCopy,
          [revieweeId]: {
            ...reviewEleCopy,
            contributed: target.checked,
          },
        });
        break;
      case "range":
        setReviewObj({
          ...reviewCopy,
          [revieweeId]: {
            ...reviewEleCopy,
            rating: Number(target.value),
          },
        });
        break;
      case "textarea":
        setReviewObj({
          ...reviewCopy,
          [revieweeId]: {
            ...reviewEleCopy,
            ratingComment: target.value,
          },
        });
        break;
    }
  };

  return (
    <>
      <Card className="new-review-card my-3">
        <CardBody className="p-0">
          <div className="d-flex">
            <div className="container-fluid row g-0">
              <div className="col-1 text-center">
                {requesterCard ? (
                  <img
                    src={reviewee.requesterProfilePath}
                    alt="Profile pic"
                    className="req-msg-cmter-img image-fluid"
                  />
                ) : (
                  <img
                    src={reviewee.responserProfilePath}
                    alt="Profile pic"
                    className="req-msg-cmter-img image-fluid"
                  />
                )}
              </div>
              <div className="col-11 review-card-body">
                <div className="my-3 ms-5 ps-2">
                  {requesterCard ? (
                    <>
                      <GradeBall grade={reviewee.requesterGrade} />
                      <span className="username-id-review">
                        {reviewee.requesterUsername} UID#
                        {reviewee.requesterId}
                      </span>
                    </>
                  ) : (
                    <>
                      <GradeBall grade={reviewee.responserGrade} />
                      <span className="username-id-responser">
                        {reviewee.responserUsername} UID#
                        {reviewee.responserId}
                      </span>
                    </>
                  )}
                </div>
                <div className="my-3 ms-5 ps-2">
                  <span className="me-2">Contributed :</span>
                  <span>
                    {requesterCard ? (
                      <Input
                        type="checkbox"
                        name="checked"
                        checked={true}
                        readOnly
                      />
                    ) : (
                      <Input
                        type="checkbox"
                        name="checked"
                        defaultChecked={
                          reviewObj[revieweeId] &&
                          reviewObj[revieweeId].contributed
                            ? reviewObj[revieweeId].contributed
                            : true
                        }
                        onChange={(e) => {
                          handleChange(e.currentTarget);
                        }}
                      />
                    )}
                  </span>
                </div>
                <div className="mt-1 ms-5 ps-2">
                  Rating :{" "}
                  <span className="username-id-review">
                    {reviewObj[revieweeId] && reviewObj[revieweeId].rating
                      ? reviewObj[revieweeId].rating
                      : 0}{" "}
                    / 5
                  </span>
                  <br />
                  <div>
                    <Input
                      type="range"
                      name="score"
                      min="-5"
                      max="5"
                      step="1"
                      defaultValue={
                        reviewObj[revieweeId] && reviewObj[revieweeId].rating
                          ? reviewObj[revieweeId].rating
                          : 0
                      }
                      onChange={(e) => {
                        handleChange(e.currentTarget);
                      }}
                    />
                  </div>
                </div>
                <div className="ms-5 ps-2 mb-4">
                  <div className="mb-2">Review :</div>
                  <textarea
                    type="textarea"
                    name="comment"
                    className="form-control response-ta pb-4"
                    rows="1"
                    maxLength="250"
                    value={
                      reviewObj[revieweeId] &&
                      reviewObj[revieweeId].ratingComment
                        ? reviewObj[revieweeId].ratingComment
                        : null
                    }
                    onChange={(e) => {
                      handleChange(e.currentTarget);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ReviewCard;
