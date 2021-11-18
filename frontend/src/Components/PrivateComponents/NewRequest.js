import { useState } from "react";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import "../../Pages/SCSS/newRequest.scss";

const NewRequest = (props) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tag, setTag] = useState("");
  const [reward, setReward] = useState(0);
  const [people, setPeople] = useState(0);
  const [district, setDistrict] = useState("");

  return (
    <>
      <div>
        <Modal isOpen={true} contentClassName="custom-modal-style">
          <ModalBody className="p-3">
            <div className="new-req-heading p-3">Create New Request</div>
            <form className="p-3">
              <label>Title</label>
              <br />
              <input
                value={title}
                type="text"
                className="form-control input-text"
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
                required
              />
              <br />
              <label className="label">Detail</label>
              <br />
              <textarea
                value={detail}
                className="form-control input-text"
                type="text"
                row="5"
                onChange={(e) => {
                  setDetail(e.currentTarget.value);
                }}
                required
              />
              <br />
              <label>Tags</label>
              <br />
              <input
                value={tag}
                type="text"
                className="form-control input-text"
                onChange={(e) => {
                  setTag(e.currentTarget.value);
                }}
                required
              />
              <br />
              <div className="row g-1">
                <div className="col-4 row g-0">
                  <div className="col-4">
                    <FaCoins className="mx-2 coin" />
                  </div>
                  <div className="col-8">
                    <input
                      value={reward}
                      onChange={(e) => {
                        setReward(e.currentTarget.value);
                      }}
                      type="number"
                      min="0"
                      step="1"
                      className="me-2 form-control input-text"
                    />
                  </div>
                </div>
                <div className="col-4 row g-0">
                  <div className="col-4">
                    <BsFillPersonPlusFill className="mx-2 person person-icon" />
                  </div>
                  <div className="col-8">
                    <input
                      value={people}
                      onChange={(e) => {
                        setPeople(e.currentTarget.value);
                      }}
                      className="me-2 form-control input-text"
                    />
                  </div>
                </div>
                <div className="col-4 row g-0">
                  <div className="col-4">
                    <HiLocationMarker className="mx-2 district district-icon" />
                  </div>
                  <div className="col-8">
                    <input
                      value={district}
                      onChnage={(e) => {
                        setDistrict(e.currentTarget.district);
                      }}
                      className="district form-control input-text"
                    />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <div className="mx-auto">
              <Button className="btn-white" onClick={props.close}>
                CREATE
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default NewRequest;
