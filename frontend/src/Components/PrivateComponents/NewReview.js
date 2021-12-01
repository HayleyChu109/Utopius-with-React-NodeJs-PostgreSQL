import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import ReviewCard from "../PrivateComponents/ReviewCard";

import { postReviewThunk } from "../../Redux/request/actions";

import { Modal, ModalBody, ModalFooter, Button, Form } from "reactstrap";
import "../../Pages/SCSS/review.scss";

function NewReview({ isOpen, requestId, setReviewModalBoolean }) {
  const { teamList, requestDetail } = useSelector(
    (state) => state.requestStore
  );
  const [reviewObj, setReviewObj] = useState({});
  const [reviewContribute, setReviewContribute] = useState([]);
  const [reviewRating, setReviewRating] = useState([]);
  const [reviewRatingCM, setReviewRatingCM] = useState([]);
  const [reviewErrorMsg, setReviewErrMsg] = useState("");

  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();

  const submitReview = () => {
    if (Object.keys(reviewObj).length < 1) {
      setReviewErrMsg("Please complete this review and submit");
    } else {
      dispatch(
        postReviewThunk(reviewObj, Number(requestId), userId, requestDetail)
      );
    }
  };

  const closeModal = () => {
    setReviewModalBoolean(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        centered
        contentClassName="custom-modal-style new-review-modal"
      >
        <Form onSubmit={submitReview}>
          <ModalBody className="p-5">
            <div className="new-review-heading p-3">Review</div>
            <div className="new-review-subtitle px-3">
              Request completed! Now rate and review your teammates!
            </div>
            {reviewErrorMsg !== "" ? (
              <div className="review-helper p-3">{reviewErrorMsg}</div>
            ) : (
              <div className="review-helper p-3">
                * No token transaction will proceed until the requester submit
                review
              </div>
            )}
            <div className="mb-3">
              {requestDetail.requesterId === userId ? (
                <>
                  {teamList && teamList.length > 0 ? (
                    teamList.map((teammate, i) => (
                      <ReviewCard
                        key={teammate.responserId}
                        revieweeId={teammate.responserId}
                        // index={i}
                        userId={userId}
                        requestId={requestId}
                        requesterCard={false}
                        reviewee={teammate}
                        reviewObj={reviewObj}
                        setReviewObj={setReviewObj}
                        reviewContribute={reviewContribute}
                        setReviewContribute={setReviewContribute}
                        reviewRatingCM={reviewRatingCM}
                        setReviewRatingCM={setReviewRatingCM}
                        reviewRating={reviewRating}
                        setReviewRating={setReviewRating}
                      />
                    ))
                  ) : (
                    <div>No review</div>
                  )}
                </>
              ) : (
                <>
                  <ReviewCard
                    userId={userId}
                    revieweeId={requestDetail.requesterId}
                    index="0"
                    requestId={requestId}
                    requesterCard={true}
                    reviewee={requestDetail}
                    reviewObj={reviewObj}
                    setReviewObj={setReviewObj}
                    reviewContribute={reviewContribute}
                    setReviewContribute={setReviewContribute}
                    reviewRatingCM={reviewRatingCM}
                    setReviewRatingCM={setReviewRatingCM}
                    reviewRating={reviewRating}
                    setReviewRating={setReviewRating}
                  />
                  {teamList && teamList.length > 0
                    ? teamList
                        .filter((teammate) => teammate.responserId !== userId)
                        .map((teammate, i) => (
                          <ReviewCard
                            key={teammate.responserId}
                            revieweeId={teammate.responserId}
                            index={i}
                            userId={userId}
                            requestId={requestId}
                            requesterCard={false}
                            reviewee={teammate}
                            reviewObj={reviewObj}
                            setReviewObj={setReviewObj}
                            reviewContribute={reviewContribute}
                            setReviewContribute={setReviewContribute}
                            reviewRatingCM={reviewRatingCM}
                            setReviewRatingCM={setReviewRatingCM}
                            reviewRating={reviewRating}
                            setReviewRating={setReviewRating}
                          />
                        ))
                    : null}
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="new-review-modal-footer">
            <div className="mx-auto">
              <Button className="me-4 btn-dark-grey" onClick={closeModal}>
                CLOSE
              </Button>
              <Button className="btn-dark-blue" onClick={submitReview}>
                SUBMIT
              </Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default NewReview;
