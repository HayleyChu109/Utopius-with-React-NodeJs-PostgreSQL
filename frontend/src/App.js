import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute";
import PrivateAdminRoute from "./Components/PrivateAdminRoute";
import LandingPage from "./Pages/PublicPages/LandingPage";
import LoginPage from "./Pages/PublicPages/LoginPage";
import SignupPage from "./Pages/MemberPages/SignupPage";
import MemberProfile from "./Pages/MemberPages/MemberProfile";
import DashboardPage from "./Pages/AdminPages/dashboardPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/member/signup" component={SignupPage} />
      <PrivateRoute path="/member/profile" component={MemberProfile} />
      <PrivateAdminRoute path='/admin' component={DashboardPage}/>
      <PrivateAdminRoute path='/admin/user/:id'/>
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
