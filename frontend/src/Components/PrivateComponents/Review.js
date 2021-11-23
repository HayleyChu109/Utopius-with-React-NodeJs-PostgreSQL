import React from "react";
import { useHistory } from "react-router-dom";
import CommentCard from "./CommentCard";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import "../../Pages/SCSS/review.scss";

function Review(props) {
  const reviewList = props.review;
  const requestId = Number(localStorage.getItem("requestId"));

  const history = useHistory();

  const showRequestDetail = (requestId) => {
    history.push(`/member/request/detail/${requestId}`);
  };

  return (
    <>
      <div>
        <Modal
          isOpen={props.isOpen}
          centered
          contentClassName="custom-modal-style new-report-modal"
        >
          <ModalBody className="p-5">
            <div className="new-review-heading p-3">Review</div>
            {reviewList && reviewList.length > 0 ? (
              reviewList
                .filter((review) => review.requestId === requestId)
                .map((review) => (
                  <CommentCard key={review.id} review={review} />
                ))
            ) : (
              <div>No review</div>
            )}
          </ModalBody>
          <ModalFooter className="new-review-modal-footer">
            <div className="mx-auto">
              <Button className="me-4 btn-dark-grey" onClick={props.close}>
                CLOSE
              </Button>
              <Button className="btn-dark-blue" onClick={showRequestDetail}>
                VISIT REQ
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Review;
