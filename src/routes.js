// views
import UserProfile from "views/ContolPanelPages/UserProfile/UserProfile";
import Dashboard from "views/Dashboard/Dashboard.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentInd from "@material-ui/icons/AssignmentInd";

var dashRoutes = [
  {
    path: "/user-page",
    name: "User Profile",
    rtlName: "الحاجيات",
    icon: AssignmentInd,
    component: UserProfile,
    layout: "/contol-panel"
  }
];

if (process.env.REACT_APP_DEV) {
  dashRoutes.push(
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: DashboardIcon,
      component: Dashboard,
      layout: "/contol-panel"
    }
  )
}

export default dashRoutes;
