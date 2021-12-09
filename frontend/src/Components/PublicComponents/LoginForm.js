import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUserThunk } from "../../Redux/login/actions";

// Set up Facebook login
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { loginFacebookThunk } from "../../Redux/login/actions";

// Set up Google login
import GoogleLogin from "react-google-login";
import { loginGoogleThunk } from "../../Redux/login/actions";

import { Button } from "reactstrap";

const LoginForm = () => {
  const loginStore = useSelector((state) => state.loginStore);
  const { isAuthenticated, errorMsg, isAdmin, blacklist } = loginStore;

  const dispatch = useDispatch();
  const history = useHistory();
  const loginEnter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && !isAdmin && !blacklist) {
      history.push("/member/profile");
    } else if (isAuthenticated && isAdmin) {
      history.push("/admin");
    }
  }, [isAuthenticated, isAdmin, blacklist, history]);

  const login = () => {
    if (email !== "" && password !== "") {
      dispatch(loginUserThunk(email, password));
    }
  };

  const responseFacebook = (userInfo) => {
    if (userInfo.accessToken) {
      dispatch(loginFacebookThunk(userInfo));
    }
    return null;
  };

  const responseGoogle = (userInfo) => {
    if (userInfo.profileObj) {
      dispatch(loginGoogleThunk(userInfo.profileObj));
    }
    return null;
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="login-form my-4">
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
              onKeyDown={(e) => loginEnter(e)}
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
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button className="btn-white-lg" onClick={renderProps.onClick}>
                LOGIN WITH FACEBOOK
              </Button>
            )}
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_APP_ID}
            render={(renderProps) => (
              <Button
                className="btn-white-lg"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                LOGIN WITH GOOGLE
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/* <Button className="btn-white-lg">LOGIN WITH FACEBOOK</Button> */}
          {/* <Button className="btn-white-lg">LOGIN WITH GOOGLE</Button> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
