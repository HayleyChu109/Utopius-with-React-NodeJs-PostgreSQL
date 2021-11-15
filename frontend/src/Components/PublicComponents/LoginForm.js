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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/todolist");
    }
  }, [isAuthenticated, history]);

  const login = () => {
    if (username !== "" && password !== "") {
      dispatch(loginUserThunk(username, password));
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="landing-form my-4">
          <h3>LOGIN</h3>
          <form>
            <label className="my-2">Username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="input-text form-control bc-fcf5ef"
              required
            />
            <label className="my-2">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="input-text form-control bc-fcf5ef "
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;
