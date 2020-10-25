// views
import UserManagement from "views/ContolPanelPages/UserManagement/UserManagement";
import UserManagementEdit from "views/ContolPanelPages/UserManagement/UserManagementEdit";
import UserProfile from "views/ContolPanelPages/UserProfile/UserProfile";
import Dashboard from "views/Dashboard/Dashboard.js";

// @material-ui/icons
import IconsBuild from "@material-ui/icons/Build";
import IconDashboard from "@material-ui/icons/Dashboard";
import IconAssignmentInd from "@material-ui/icons/AssignmentInd";

var dashRoutes = [
  {
    type: 'group-title',
    text: 'Member'
  },
  {
    path: "/user-page",
    name: "User Profile",
    rtlName: "الحاجيات",
    icon: IconAssignmentInd,
    component: UserProfile,
    layout: "/contol-panel"
  },
  {
    type: 'spliter',
    code: 'ADMIN_PANEL'
  },
  {
    type: 'group-title',
    text: 'Admin',
    code: 'ADMIN_PANEL'
  },
  {
    path: "/user-management/index",
    name: "User Management",
    rtlName: "",
    icon: IconsBuild,
    component: UserManagement,
    layout: "/contol-panel",
    code: 'ADMIN_PANEL'
  },
  {
    type: 'hidden-page',
    path: "/user-management/edit",
    name: "Edit User",
    rtlName: "",
    icon: IconsBuild,
    component: UserManagementEdit,
    layout: "/contol-panel"
  },
];

if (process.env.REACT_APP_DEV) {
  dashRoutes.push(
    {
      type: 'spliter',
    }
  )

  dashRoutes.push(
    {
      type: 'group-title',
      text: 'Dev'
    }
  )
  
  dashRoutes.push(
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: IconDashboard,
      component: Dashboard,
      layout: "/contol-panel"
    }
  )
}

export default dashRoutes;
