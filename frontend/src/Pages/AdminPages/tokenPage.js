import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostTokenPlan } from "../../Redux/adminToken/action";
import { tokenPlanThunk } from "../../Redux/token/tokenPlanActions";
import { RedeemList } from "../../Components/PrivateComponents/admin/redeemList";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { TokenTransactionList } from "../../Components/PrivateComponents/admin/tokenTransactionList";
import { TokenIncomeList } from "../../Components/PrivateComponents/admin/TokenIncomeList";
import { s3Config } from "../../s3Bucket/s3Config";
import S3 from "react-aws-s3";
import { FaCoins } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { Modal, Button, InputGroup } from "react-bootstrap";
import { Form, Col, Row } from "react-bootstrap";
import TokenCard from "../../Components/PrivateComponents/TokenCard";
export default function TokeNAdminPage() {
  const dispatch = useDispatch();
  const ReactS3Client = new S3(s3Config);
  const tokenPlans = useSelector((state) => state.tokenPlanStore.tokenPlan);
  const [addPlan, setaddPlan] = useState(false);
  const [error, setError] = useState("");
  const [tokenPlan, setTokenPlan] = useState("");
  const [token, setToken] = useState("");
  const [detail, setDetail] = useState("");
  const [cost, setCost] = useState("");
  const [{ src, path, alt }, setPlanPhoto] = useState({
    src: "",
    path: "",
    alt: "wait for upload",
  });
  const handleSubmission = (event) => {
    setError("");
    event.preventDefault();
    if (path !== "") {
      ReactS3Client.uploadFile(path, alt).then((data) => {
        let planObj = {
          planName: tokenPlan,
          noOfToken: token,
          detail: detail,
          hkd: cost,
          photoPath: data.location,
        };

        dispatch(PostTokenPlan(planObj));
        closeAddPlan();
      });
    } else {
      setError("Photo cannot be null");
      return false;
    }
  };
  const closeAddPlan = () => {
    setError("");
    setaddPlan(false);
    setPlanPhoto("");
    setCost("");
    setToken("");
    setDetail("");
    setPlanPhoto({
      src: "",
      path: "",
      alt: "wait for upload",
    });
  };
  const imgPreview = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setPlanPhoto({
        src: URL.createObjectURL(event.target.files[0]),
        path: event.target.files[0],
        alt: event.target.files[0].name,
      });
    }
  };
  useEffect(() => {
    dispatch(tokenPlanThunk());
  }, [dispatch]);
  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <div className="my-4 px-4 token-title">
          <FaCoins className="mb-1 me-2" />
          Token Plan
        </div>
        <div className="d-flex justify-content-center text-center">
          {tokenPlans && tokenPlans.length > 0
            ? tokenPlans.map((plan) => (
                <TokenCard key={plan.planName} tokenPlan={plan} />
              ))
            : null}
        </div>
      </div>
      <div className="container py-4">
        <div className="my-4 px-4 token-title">
          <FaCoins className="mb-1 me-2" />
          Redeem Items
        </div>
        <RedeemList />
      </div>
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          User Token Transaction
          <a href="/admin/token/history" className="float-end token-link">
            <BsArrowReturnRight /> more transaction history
          </a>
        </div>
        <TokenTransactionList itemsPerPage={4} />
      </div>
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          Token Purchase Record
          <a href="/admin/token/record" className="float-end token-link">
            <BsArrowReturnRight /> more purchase record
          </a>
        </div>
        <TokenIncomeList />
      </div>
      <Modal show={addPlan} onHide={() => closeAddPlan()} size="lg">
        <Modal.Header>
          <Modal.Title>
            <div className="memberProfile-title">
              <BsStars className="mb-1 me-2" />
              Token Plan
            </div>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmission}>
          <Modal.Body>
            <Row>
              <Col className="d-flex flex-column justify-content-center">
                {src === "" ? (
                  <GiReceiveMoney className="new-plan mx-auto" />
                ) : (
                  <img src={src} alt={alt} className="new-plan mx-auto mb-3" />
                )}
                <Form.Control type="file" onChange={(e) => imgPreview(e)} />
              </Col>
              <Col>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="input"
                    placeholder="Token plan Name"
                    name="token plan"
                    value={tokenPlan}
                    onChange={(e) => setTokenPlan(e.target.value)}
                  />
                  <label htmlFor="Token-plan">Token Plan Name</label>
                </Form.Floating>

                <InputGroup className="mb-3">
                  <Form.Label htmlFor="cost" visuallyHidden>
                    Cost
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
                <InputGroup className="mb-3">
                  <Form.Label htmlFor="cost" visuallyHidden>
                    Cost
                  </Form.Label>
                  <InputGroup.Text>HKD</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="cost"
                    name="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </InputGroup>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="textarea"
                    placeholder="detail"
                    name="detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                  <label htmlFor="detail">detail</label>
                </Form.Floating>
              </Col>
            </Row>
            {error !== "" ? <p className="text-danger">{error}</p> : null}
          </Modal.Body>

          <Modal.Footer className="admin-footer">
            <Button variant="primary" type="submit">
              Save changes
            </Button>
            <Button variant="secondary" onClick={closeAddPlan}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
