import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUserThunk } from "../../Redux/login/actions";
import { Button } from "reactstrap";

const LoginForm = () => {
  const loginStore = useSelector((state) => state.loginStore);
  const { isAuthenticated, errorMsg } = loginStore;

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/member/profile");
    }
  }, [isAuthenticated, history]);

  const login = () => {
    if (email !== "" && password !== "") {
      dispatch(loginUserThunk(email, password));
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="landing-form my-4">
          <h3>LOGIN</h3>
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
              <Button onClick={login} className="btn-orange py-0 my-4">
                LOG IN
              </Button>
            </div>
          </form>
          <hr className="login-hr" />
          <Button className="btn-white-lg">LOGIN WITH FACEBOOK</Button>
          <Button className="btn-white-lg">LOGIN WITH GOOGLE</Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
