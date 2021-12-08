import { useEffect, useState } from "react";
import {
  GetRedeemItem,
  PostRedeemItem,
} from "../../../Redux/adminToken/action";
import { Modal, Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import { RedeemProductCard } from "../RedeemProductCard";
import { useDispatch, useSelector } from "react-redux";
import { s3Config } from "../../../s3Bucket/s3Config";
import S3 from "react-aws-s3";
import { FaCoins } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { GiPresent } from "react-icons/gi";
export const RedeemList = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const ReactS3Client = new S3(s3Config);
  const handleOpen = () => setModal(true);
  const handleClose = () => {
    setError("");
    setName("");
    setPhoto({
      src: "",
      path: "",
      alt: "wait for upload",
    });
    setToken("");
    setStock("");
    setModal(false);
  };
  const { redeemItem } = useSelector((state) => state.adminTokenStore);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [stock, setStock] = useState("");
  const [{ src, path, alt }, setPhoto] = useState({
    src: "",
    path: "",
    alt: "wait for upload",
  });
  const handleSubmission = () => {
    setError("");
    if (path !== "") {
      ReactS3Client.uploadFile(path, alt).then((data) => {
        let dataObj = {
          name: name,
          token: token,
          stock: stock,
          itemPath: data.location,
        };
        dispatch(PostRedeemItem(dataObj));
        handleClose()
      });
    } else {
      setError("Photo cannot be null");
      return false;
    }
  };
  const imgPreview = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto({
        src: URL.createObjectURL(event.target.files[0]),
        path: event.target.files[0],
        alt: event.target.files[0].name,
      });
    }
  };
  useEffect(() => {
    dispatch(GetRedeemItem());
  }, [dispatch]);

  return (
    <>
      <button onClick={handleOpen} className="ms-4 btn-coin">
        ADD
      </button>
      <div xs={4} className="d-flex flex-wrap justify-content-center">
        {redeemItem && redeemItem.length > 0 ? (
          redeemItem.map((item) => (
            <RedeemProductCard key={item.id} {...item} />
          ))
        ) : (
          <p className="mx-auto text-center">There is no redeem item yet</p>
        )}
      </div>
      <Modal show={modal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="memberProfile-title">
              <BsStars className="mb-1 me-2" />
              Redeem Item
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              {src === "" ? (
                <GiPresent className="new-plan mx-auto" />
              ) : (
                <img src={src} alt={alt} className="new-plan mx-auto mb-3" />
              )}
              <Form.Control type="file" onChange={(e) => imgPreview(e)} />
            </Col>
            <Col>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="input"
                  placeholder="Item Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="Token-plan">Item Name</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="stock"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
                <label htmlFor="detail">stock</label>
              </Form.Floating>
              <InputGroup className="mb-3">
                <Form.Label htmlFor="token" visuallyHidden>
                  token
                </Form.Label>
                <InputGroup.Text>
                  <FaCoins />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Token"
                  name="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          {error !== "" ? <p className="text-danger">{error}</p> : null}
        </Modal.Body>
        <Modal.Footer className="admin-footer">
          <Button variant="primary" onClick={handleSubmission}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
