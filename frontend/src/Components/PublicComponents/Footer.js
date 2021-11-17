import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMsgThunk } from "../../Redux/footer/footerAction";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Modal } from "react-bootstrap";
import "../../Pages/SCSS/footer.scss";
import { BsFillSuitHeartFill } from "react-icons/bs";

const Footer = () => {
  const dispatch = useDispatch();

  // For modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendMsg = (e) => {
    e.preventDefault();
    dispatch(sendMsgThunk(email, name, title, message));
    setShow("true");
    setEmail("");
    setName("");
    setTitle("");
    setMessage("");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex align-items-center justify-content-center footer-page">
            <div className="container row p-5">
              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-xs-12">
                <h3 className="mt-4">Contact Us</h3>
                <p>
                  Address: 3/F, Citicorp Centre, 18 Whitfield Rd, Tin Hau,
                  Fortress Hill
                </p>
                <p>Phone: 6883 8583</p>
                <p>Email: admin@utopius.com</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.780995769679!2d114.18809891453!3d22.28628434903626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401c906c85397%3A0xedd2d296aa8a7803!2sXccelerate!5e0!3m2!1szh-TW!2shk!4v1636989613892!5m2!1szh-TW!2shk"
                  className="mb-3"
                  style={{
                    width: "680px",
                    height: "450px",
                    borderRadius: "20px",
                  }}
                  title="googleFrame"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="footer-card col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                <div className="container">
                  <h3 className="my-4">Leave a message</h3>
                  <Form onSubmit={sendMsg}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        className="input-text"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        className="input-text"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="title">Title</Label>
                      <Input
                        className="input-text"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="message">Message</Label>
                      <Input
                        className="input-text msgTextarea"
                        name="text"
                        type="textarea"
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        required
                      />
                    </FormGroup>
                    <div className="text-center">
                      <button className="btn-blue mt-3 mb-4" type="submit">
                        SEND
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="container copyright">
            <div className="col-12">
              <p className="pe-5 me-5">&#169; 2021 UTOPIUS</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="msgModal">
            Thank you&nbsp;
            <BsFillSuitHeartFill />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Your message submitted successfully!</Modal.Body>
      </Modal>
    </>
  );
};

export default Footer;
