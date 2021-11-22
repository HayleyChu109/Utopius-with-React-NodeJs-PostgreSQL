import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { createNewRequestThunk } from "../../Redux/request/actions";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import "../../Pages/SCSS/newRequest.scss";

const NewRequest = (props) => {
  const { requestId } = useSelector((state) => state.requestStore);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tag, setTag] = useState("");
  const [reward, setReward] = useState(0);
  const [people, setPeople] = useState(0);
  const [district, setDistrict] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (requestId !== null) {
      console.log("requestDetail.id", requestId);
      history.push(`/member/request/detail/${requestId.newReqId}`);
    } else {
      return;
    }
  }, [requestId, history]);

  const submitNewReq = () => {
    setErrMsg("");
    if (title.trim() === "" || detail.trim() === "" || district === "") {
      setErrMsg("Please fill in all the fields");
    } else {
      let userId = jwt_decode(localStorage.getItem("token")).id;
      console.log(userId);
      let newReq = {
        userId: userId,
        title: title.trim(),
        detail: detail.trim(),
        reward: Number(reward),
        requiredPpl: Number(people),
        district: district,
        status: "Open",
        tag: tag
          .split(" ")
          .filter((newTag) => newTag[0] === "#" && newTag.length > 1)
          .map((newTag) => newTag.slice(1)),
      };
      console.log(newReq);
      dispatch(createNewRequestThunk(newReq));
    }
  };

  return (
    <>
      <div>
        <Modal
          isOpen={true}
          centered
          contentClassName="custom-modal-style new-req-modal"
        >
          <ModalBody className="p-5">
            <div className="new-req-heading p-3">Create New Request</div>
            <form className="p-3 new-req-form">
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
                rows="7"
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
                placeholder="E.g. #Tagname1 #Tagname2"
                className="form-control input-text"
                onChange={(e) => {
                  setTag(e.currentTarget.value);
                }}
                required
              />

              <br />
              <div className="mt-3 row g-1">
                <div className="col-1 new-req-coin">
                  <FaCoins className="mx-2 coin" />
                </div>
                <div className="col-2">
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
                <div className="col-1 new-req-people">
                  <BsFillPersonPlusFill className="mx-2 person person-icon" />
                </div>
                <div className="col-2">
                  <input
                    defaultValue={people}
                    type="number"
                    min="0"
                    max="20"
                    step="1"
                    onChange={(e) => {
                      setPeople(e.currentTarget.value);
                    }}
                    className="me-2 form-control input-text"
                  />
                </div>
                <div className="col-1 new-req-district">
                  <HiLocationMarker className="mx-2 district district-icon" />
                </div>
                <div className="col-5">
                  <select
                    className="district form-control input-text"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.currentTarget.value);
                    }}
                    required
                  >
                    <option></option>
                    <option>Central and Western</option>
                    <option>Eastern</option>
                    <option>Southern</option>
                    <option>Wan Chai</option>
                    <option>Kowloon City</option>
                    <option>Kwun Tong</option>
                    <option>Sham Shui Po</option>
                    <option>Wong Tai Sin</option>
                    <option>Yau Tsim Mong</option>
                    <option>Kwai Tsing</option>
                    <option>North</option>
                    <option>Sha Tin</option>
                    <option>Tai Po</option>
                    <option>Tsuen Wan</option>
                    <option>Tuen Mun</option>
                    <option>Yuen Long</option>
                    <option>Sai Kung</option>
                    <option>Islands</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="errMsg ps-3">{errMsg}</div>
          </ModalBody>
          <ModalFooter className="new-req-modal-footer">
            <div className="mx-auto">
              <Button className="btn-dark-orange" onClick={submitNewReq}>
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
