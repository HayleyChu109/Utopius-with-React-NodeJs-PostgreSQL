import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { memberInfoThunk } from "../Redux/memberProfile/memberProfileActions";
import jwt_decode from "jwt-decode";
import SignupPage from "../Pages/MemberPages/SignupPage";

const PrivateRoute = ({ component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);
  const { isAdmin } = useSelector((state) => state.loginStore);

  const Component = component;

  // Check if member is filled in personal information
  let memberId = jwt_decode(localStorage.getItem("token")).id;
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(memberInfoThunk(memberId));
  }, [dispatch, memberId]);

  return (
    <Route
      {...rest}
      render={() => {
        if (memberProfileFromStore) {
          if (
            isAuthenticated &&
            !isAdmin &&
            memberProfileFromStore.username !== null
          ) {
            return <Component />;
          } else if (
            isAuthenticated &&
            !isAdmin &&
            memberProfileFromStore.username === null
          ) {
            return <SignupPage />;
          } else if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
        }
      }}
    ></Route>
  );
};

export default PrivateRoute;
