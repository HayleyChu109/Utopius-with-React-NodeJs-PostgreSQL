import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { loginUserThunk } from "../../Redux/login/actions";
import { loginFacebookThunk } from "../../Redux/login/actions";
import { getAllUsernameThunk } from "../../Redux/memberProfile/memberProfileActions";
import { Button } from "reactstrap";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginStore = useSelector((state) => state.loginStore);
  const { isAuthenticated, errorMsg, isAdmin } = loginStore;

  // Get existing member info from store
  const allUsernameFromStore = useSelector(
    (state) => state.memberProfileStore.allUsername
  );

  const filteredMember = allUsernameFromStore.filter((member) => {
    return member.email == email;
  });

  console.log(filteredMember);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginEnter = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    dispatch(getAllUsernameThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !isAdmin && filteredMember.username === null) {
      history.push("/member/signup");
    } else if (
      isAuthenticated &&
      !isAdmin &&
      filteredMember.username !== null
    ) {
      history.push("/member/profile");
    } else if (isAuthenticated && isAdmin) {
      history.push("/admin");
    }
  }, [isAuthenticated, isAdmin, history]);

  const login = () => {
    if (email !== "" && password !== "") {
      dispatch(loginUserThunk(email, password));
    }
  };

  const responseFacebook = (userInfo) => {
    console.log(userInfo);
    if (userInfo.accessToken) {
      dispatch(loginFacebookThunk(userInfo));
    }
    return null;
  };

  console.log(isAuthenticated);

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
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button className="btn-white-lg" onClick={renderProps.onClick}>
                LOGIN WITH FACEBOOK
              </Button>
            )}
          />
          {/* <Button className="btn-white-lg">LOGIN WITH FACEBOOK</Button> */}
          <Button className="btn-white-lg">LOGIN WITH GOOGLE</Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
