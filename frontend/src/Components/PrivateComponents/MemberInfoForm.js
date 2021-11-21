import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { memberInfoFormSubmitThunk } from "../../Redux/signup/memberInfoFormActions";

import S3 from "react-aws-s3";
import { s3Config } from "../../s3Bucket/s3Config";

import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../Pages/SCSS/signupPage.scss";
import "../../Pages/SCSS/loginPage.scss";
import anonymous from "../../Images/anonymous.jpeg";

const MemberInfoForm = () => {
  const [{ src, alt }, setPreviewImg] = useState({
    src: anonymous,
    alt: "Upload an image",
  });
  const [{ bucketSrc, bucketAlt }, setBucketImg] = useState({
    bucketSrc: "",
    bucketAlt: "",
  });
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  console.log(username, firstname, lastname, phone, district);

  const dispatch = useDispatch();

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

  const memberInfoFormSubmit = (e) => {
    e.preventDefault();
    let file = bucketSrc;
    let newFileName = bucketAlt;
    const ReactS3Client = new S3(s3Config);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        dispatch(
          memberInfoFormSubmitThunk(
            username,
            firstname,
            lastname,
            phone,
            district,
            data.location
          )
        );
        setUsername("");
        setFirstname("");
        setLastname("");
        setPhone("");
        setDistrict("");
        setPreviewImg({
          src: anonymous,
          alt: "Upload an image",
        });
        setBucketImg({
          bucketSrc: "",
          bucketAlt: "",
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <Form onSubmit={memberInfoFormSubmit}>
      <div className="d-flex align-items-center justify-content-center landing-page">
        <div className="container row p-5">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="text-center">
              <h3 className="mt-4">FILL IN PERSONAL INFORMATION</h3>
              <img src={src} alt={alt} className="my-5 previewPhoto" />
              <Input name="file" type="file" onChange={ImgPreview} />
            </div>
          </div>
          <div className="footer-card col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="container">
              <FormGroup>
                <Label for="username" className="mt-4">
                  Username
                </Label>
                <Input
                  className="input-text"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="firstname">First name</Label>
                <Input
                  className="input-text"
                  name="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Last name</Label>
                <Input
                  className="input-text"
                  name="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.currentTarget.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  className="input-text"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="district">District</Label>
                <Input
                  className="input-text"
                  name="district"
                  type="select"
                  selectvalue={district}
                  onChange={(e) => setDistrict(e.currentTarget.value)}
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
                </Input>
              </FormGroup>
              <div className="text-center">
                <button className="btn-orange mt-3 mb-4" type="submit">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default MemberInfoForm;
