import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute";
import LandingPage from "./Pages/PublicPages/LandingPage";
import LoginPage from "./Pages/PublicPages/LoginPage";
import SignupPage from "./Pages/MemberPages/SignupPage";
import MemberProfile from "./Pages/MemberPages/MemberProfile";
import RequestDetail from "./Pages/MemberPages/RequestDetail";
import NewRequest from "./Components/PrivateComponents/NewRequest";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/member/signup" component={SignupPage} />
      <PrivateRoute path="/member/profile" component={MemberProfile} />
      <PrivateRoute path="/member/request/detail" component={RequestDetail} />
      <PrivateRoute path="/member/request/new" component={NewRequest} />
      <Route
        component={() => {
          return (
            <div>
              <h3>Error, path not found</h3>
            </div>
          );
        }}
      />
    </Switch>
  );
}

export default App;
