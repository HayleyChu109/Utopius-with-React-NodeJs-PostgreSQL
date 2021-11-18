import { useState } from "react";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

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
          <ModalBody>
            <div>Create New Request</div>
            <br />
            <form>
              <label>Title</label>
              <input
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
                required
              />
              <label>Detail</label>
              <textarea
                value={detail}
                type="text"
                onChange={(e) => {
                  setDetail(e.currentTarget.value);
                }}
                required
              />
              <label>Title</label>
              <input
                value={tag}
                type="text"
                onChange={(e) => {
                  setTag(e.currentTarget.value);
                }}
                required
              />
              <div>
                <FaCoins className="mx-2 coin" />
                <input
                  value={reward}
                  onChange={(e) => {
                    setReward(e.currentTarget.value);
                  }}
                  type="number"
                  min="0"
                  step="1"
                  className="me-2"
                />
                <BsFillPersonPlusFill className="mx-2 person person-icon" />
                <input
                  value={people}
                  onChange={(e) => {
                    setPeople(e.currentTarget.value);
                  }}
                  className="me-2"
                />
                <HiLocationMarker className="mx-2 district district-icon" />
                <input
                  value={district}
                  onChnage={(e) => {
                    setDistrict(e.currentTarget.district);
                  }}
                  className="district"
                />
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
