import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Card,
  CardBody,
} from "reactstrap";

import GradeBall from "../PublicComponents/GradeBall";
import "../../Pages/SCSS/review.scss";

function NewReview(props) {
  const [userReview, setUserReview] = useState({
    score: 0,
    checked: false,
    comment: "",
  });
  console.log(userReview);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setUserReview({ ...userReview, [e.currentTarget.name]: value });
  };

  const dispatch = useDispatch();
  const submitReview = () => {};

  return (
    <>
      <Modal
        isOpen={true}
        centered
        contentClassName="custom-modal-style new-review-modal"
      >
        <Form onSubmit={submitReview}>
          <ModalBody className="p-5">
            <div className="new-review-heading p-3">Review</div>
            <div className="new-review-subtitle px-3 pb-5">
              Request completed! Now rate and review your matchers!
            </div>
            {/* Each rating */}
            <div className="mb-3">
              <Card className="review-card">
                <CardBody className="p-0">
                  <div className="d-flex">
                    <div className="container-fluid row g-0">
                      <div className="col-lg-1 text-center">
                        <img src={"/heart.png"} alt="Profile pic" />
                      </div>
                      <div className="col-lg-11 review-card-body">
                        <div className="d-flex">
                          <div className="mt-3 ms-5 ps-2">
                            <GradeBall grade="A" />
                            <span>member01 UID#4</span>
                          </div>
                          <p className="mt-3 ms-5 ps-2">
                            Contributed:&nbsp;
                            <span>
                              <Input
                                type="checkbox"
                                name="checked"
                                checked={userReview.checked}
                                onChange={handleChange}
                              />
                            </span>
                          </p>
                        </div>
                        <div className="mt-1 ms-5 ps-2">
                          Rating: {userReview.score}
                          <br />
                          <Input
                            type="range"
                            name="score"
                            min="-5"
                            max="5"
                            step="1"
                            value={userReview.score}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="ms-5 ps-2 mb-4">
                          Review: <br />{" "}
                          <Input
                            type="textarea"
                            name="comment"
                            rows="6"
                            maxLength="250"
                            value={userReview.comment}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            {/* Each rating */}
          </ModalBody>
          <ModalFooter className="new-review-modal-footer">
            <div className="mx-auto">
              <Button
                className="me-4 btn-dark-grey"
                onClick={function noRefCheck() {}}
              >
                CLOSE
              </Button>{" "}
              <Button className="btn-dark-blue" type="submit">
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
