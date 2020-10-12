// views
import UserProfile from "views/Pages/UserProfile.js";

// @material-ui/icons

var dashRoutes = [
    {
      path: "/user-page",
      name: "User Profile",
      rtlName: "الحاجيات",
      component: UserProfile,
      layout: "/admin"
    }
];

export default dashRoutes;