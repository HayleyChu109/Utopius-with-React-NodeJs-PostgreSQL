import React from "react";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import "../../Pages/SCSS/review.scss";

function Review(props) {
  const reviewList = JSON.parse(localStorage.getItem("review"));

  // let gradeColor = "";
  // switch (review.grade) {
  //   case "S":
  //     gradeColor = "#fac77c";
  //   case "A":
  //     gradeColor = "#fa7c92";
  //   case "B":
  //     gradeColor = "#7c97fa";
  //   case "C":
  //     gradeColor = "#52b46e";
  //   case "D":
  //     gradeColor = "#152e87";
  //   case "E":
  //     gradeColor = "#875915";
  //   case "F":
  //     gradeColor = "#333333";
  //   default:
  //     gradeColor = "#c4c4c4";
  // }

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
            <div>
              {reviewList && reviewList > 0
                ? reviewList.map((review) => (
                    <div>
                      <p>
                        <span
                          className="dot text-center me-2"
                          // style={{ backgroundColor: gradeColor }}
                        >
                          {review.grade}
                        </span>
                        {review.username} UID#{review.reviewerId}
                      </p>
                      <p>Rating: {review.rating}</p>
                      <p>Review: {review.ratingComment}</p>
                    </div>
                  ))
                : null}
            </div>
          </ModalBody>
          <ModalFooter className="new-review-modal-footer">
            <div className="mx-auto">
              <Button className="me-4 btn-dark-grey" onClick={props.close}>
                CLOSE
              </Button>
              <Button
                className="btn-dark-blue"
                onClick={function noRefCheck() {}}
              >
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
