// views
import UserProfile from "views/Pages/UserProfile.js";
import Dashboard from "views/Dashboard/Dashboard.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

var dashRoutes = [
    {
      path: "/user-page",
      name: "User Profile",
      rtlName: "الحاجيات",
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: DashboardIcon,
      component: Dashboard,
      layout: "/admin"
    }
];

export default dashRoutes;