import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute";
import PrivateAdminRoute from "./Components/PrivateAdminRoute";
import LandingPage from "./Pages/PublicPages/LandingPage";
import LoginPage from "./Pages/PublicPages/LoginPage";
import SignupPage from "./Pages/MemberPages/SignupPage";
import RequestDetail from "./Pages/MemberPages/RequestDetail";
import NewRequest from "./Components/PrivateComponents/NewRequest";
import FellowProfilePage from "./Pages/MemberPages/FellowProfilePage";
import MemberProfilePage from "./Pages/MemberPages/MemberProfilePage";
import DashboardPage from "./Pages/AdminPages/dashboardPage";
import AnnouncementPage from "./Pages/AdminPages/announcementPage";
import AnnouncemnetEditPage from "./Pages/AdminPages/announcementEditPage";
import UserPage from "./Pages/AdminPages/userPage";
import AdminHome from './Pages/AdminPages/AdminHome'
import RequestPage from "./Pages/AdminPages/requestPage";
import TaskPage from "./Pages/AdminPages/taskPage";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateAdminRoute exact path='/admin' component={AdminHome}/>
      <PrivateAdminRoute exact path='/admin/dashboard' component={DashboardPage}/>
      <PrivateAdminRoute exact path='/admin/task' component={TaskPage}/>
      <PrivateAdminRoute exact path='/admin/request' component={RequestPage}/>
      <PrivateAdminRoute exact  path='/admin/announcement' component={AnnouncementPage}/>
      <PrivateAdminRoute exact  path='/admin/announcement/new' component={AnnouncemnetEditPage}/>
      <PrivateAdminRoute  path='/admin/announcement/edit/:id' component={AnnouncemnetEditPage}/>
      <PrivateAdminRoute path='/admin/user/:id'component={UserPage}/>

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
