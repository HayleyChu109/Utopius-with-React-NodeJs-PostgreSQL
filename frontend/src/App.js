import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute";
import LandingPage from "./Pages/PublicPages/LandingPage";
import LoginPage from "./Pages/PublicPages/LoginPage";
import SignupPage from "./Pages/MemberPages/SignupPage";
import RequestDetail from "./Pages/MemberPages/RequestDetail";
import NewRequest from "./Components/PrivateComponents/NewRequest";
import FellowProfilePage from "./Pages/MemberPages/FellowProfilePage";
import MemberProfilePage from "./Pages/MemberPages/MemberProfilePage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/member/signup" component={SignupPage} />
      <PrivateRoute
        path="/member/request/detail/:requestId"
        component={RequestDetail}
      />
      <PrivateRoute path="/member/request/new" component={NewRequest} />
      <PrivateRoute
        path="/member/fellow/:fellowId"
        component={FellowProfilePage}
      />
      <PrivateRoute path="/member/profile" component={MemberProfilePage} />
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
