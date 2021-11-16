import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUserThunk } from "../../Redux/signup/actions";
import { Button } from "reactstrap";
import SuccessModal from "./SuccessModal";

const SignupForm = () => {
  const signupStore = useSelector((state) => state.signupStore);
  const { successMsg, errorMsg } = signupStore;

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalBoolean, setModalBoolean] = useState(false);

  useEffect(() => {
    if (successMsg !== null) {
      setModalBoolean(true);
      setEmail("");
      setPassword("");
    }
  }, [successMsg]);

  const signup = () => {
    if (email !== "" && password !== "") {
      dispatch(signupUserThunk(email, password));
    }
  };

  const closeModal = () => {
    setModalBoolean(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="landing-form my-4">
          <h3>SIGNUP A NEW ACCOUNT</h3>
          <form>
            <label className="my-2">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="input-text form-control"
              required
            />
            <label className="my-2">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="input-text form-control"
              required
            />
            <br />
            {errorMsg && <div className="err-msg">{errorMsg}</div>}
            <div className="text-center py-2">
              <Button onClick={signup} className="btn-orange py-0 my-4">
                SIGN UP
              </Button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        isOpen={modalBoolean}
        close={closeModal}
        message={successMsg}
      />
    </>
  );
};

export default SignupForm;
