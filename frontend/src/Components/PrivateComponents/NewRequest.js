import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";
import { createNewRequestThunk } from "../../Redux/request/actions";

import S3 from "react-aws-s3";
import { s3Config } from "../../s3Bucket/s3Config";

import { Button, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import { FaCoins, FaDraft2Digital } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import "../../Pages/SCSS/newRequest.scss";
import "../../Pages/SCSS/signupPage.scss";

const NewRequest = (props) => {
  const { memberInfo } = useSelector((state) => state.memberProfileStore);
  const { requestId } = useSelector((state) => state.requestStore);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tag, setTag] = useState("");
  const [reward, setReward] = useState(0);
  const [people, setPeople] = useState(0);
  const [district, setDistrict] = useState("");
  const [{ src, alt }, setPreviewImg] = useState({
    src: "",
    alt: "Upload an image",
  });
  const [{ bucketSrc, bucketAlt }, setBucketImg] = useState({
    bucketSrc: "",
    bucketAlt: "Photo for request",
  });
  const [errMsg, setErrMsg] = useState("");

  let userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(memberInfoThunk(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (requestId !== null) {
      history.push(`/member/request/detail/${requestId.newReqId}/comment`);
    } else {
      return;
    }
  }, [requestId, history]);

  const ImgPreview = (e) => {
    console.log(e.currentTarget.files[0]);
    if (e.currentTarget.files[0]) {
      setPreviewImg({
        src: URL.createObjectURL(e.currentTarget.files[0]),
        alt: e.currentTarget.files[0].name,
      });
      setBucketImg({
        bucketSrc: e.currentTarget.files[0],
        bucketAlt: e.currentTarget.files[0].name,
      });
    }
  };

  const submitNewReq = () => {
    setErrMsg("");
    if (
      bucketSrc === "" ||
      title.trim() === "" ||
      detail.trim() === "" ||
      district === ""
    ) {
      setErrMsg("Please choose an image and fill in all the fields");
    } else if (Number(people) > 20 || Number(people) < 1) {
      setErrMsg("Please set a valid number of required people : 1 - 20");
    } else if (
      Number(reward) < 1 ||
      Number(reward) * Number(people) > memberInfo.token
    ) {
      setErrMsg(
        `Please set a valid amount of reward : 1 - ${Math.floor(
          memberInfo.token / Number(people)
        )}`
      );
    }

    if (src.includes("amazonaws") === false) {
      let file = bucketSrc;
      let newFileName = bucketAlt;
      const ReactS3Client = new S3(s3Config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        let newReq = {
          userId: userId,
          title: title.trim(),
          detail: detail.trim(),
          reward: Number(reward),
          requiredPpl: Number(people),
          district: district,
          photoPath: data.location,
          status: "open",
          tag: tag
            .split(" ")
            .filter((newTag) => newTag[0] === "#" && newTag.length > 1)
            .map((newTag) => newTag.slice(1)),
        };
        console.log(newReq);
        dispatch(createNewRequestThunk(newReq));
      });
    } else {
      let newReq = {
        userId: userId,
        title: title.trim(),
        detail: detail.trim(),
        reward: Number(reward),
        requiredPpl: Number(people),
        district: district,
        photoPath: src,
        status: "open",
        tag: tag
          .split(" ")
          .filter((newTag) => newTag[0] === "#" && newTag.length > 1)
          .map((newTag) => newTag.slice(1)),
      };
      dispatch(createNewRequestThunk(newReq));
    }
  };

  return (
    <>
      <div>
        <Modal
          isOpen={props.isOpen}
          centered
          contentClassName="custom-modal-style new-req-modal"
        >
          <ModalBody className="p-5">
            <div className="new-req-heading p-3">Create New Request</div>
            <form className="p-3 new-req-form">
              <label>
                Photo (Please choose your own photo or use default photo)
              </label>
              <br />
              <div className="d-flex text-center align-items-center my-3">
                <div className="col-lg-7">
                  <img
                    src={src}
                    alt={alt}
                    className="my-3 previewPhoto-request"
                  />
                </div>
                <div className="col-lg-5">
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/help.png"
                    alt="Help"
                    title="Help"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/homecare.png"
                    alt="Home care"
                    title="Home care"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/cleaning.png"
                    alt="Cleaning"
                    title="Cleaning"
                    className="mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/teamup.png"
                    alt="Team up"
                    title="Team up"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/pet.png"
                    alt="Pet caring"
                    title="Pet caring"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/plants.png"
                    alt="Plants"
                    title="Plants caring"
                    className="mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/lost-and-found.png"
                    alt="Lost and found"
                    title="Lost and found"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/repair.png"
                    alt="Repair"
                    title="Repair"
                    className="me-2 mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                  <img
                    src="https://utopius.s3.ap-southeast-1.amazonaws.com/bartar.png"
                    alt="Bartar"
                    title="Good exchange good"
                    className="mb-2 smallphoto"
                    onClick={(e) => {
                      setPreviewImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                      setBucketImg({
                        src: e.currentTarget.src,
                        alt: e.currentTarget.alt,
                      });
                    }}
                  />
                </div>
              </div>
              <Input type="file" onChange={ImgPreview} />
              <br />
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
                maxLength="250"
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
                maxLength="45"
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
                    max="10"
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
              <Button className="me-4 btn-dark-grey" onClick={props.close}>
                CLOSE
              </Button>
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
