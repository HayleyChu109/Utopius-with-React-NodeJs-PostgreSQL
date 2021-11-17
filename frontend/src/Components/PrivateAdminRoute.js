import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAdminRoute = ({ component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);
  const { isAdmin } = useSelector((state) => state.loginStore);
  const Component = component;

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated&&isAdmin ? <Component /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateAdminRoute;
