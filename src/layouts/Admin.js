import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import FooterStyleA from "components/Footer/FooterStyleA.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { creatorAccounts, creatorRoles } from "redux/creator";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import routes from "routes.js";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const { ...rest } = props;

  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [image, setImage] = useState(require("assets/img/sidebar-2.jpg"));
  const [color, setColor] = useState("blue");
  const [bgColor, setBgColor] = useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(require("assets/img/logo-white.svg"));
  // styles
  const classes = useStyles();
  const authe = useSelector(state => state.authentication);
  const accou = useSelector(state => state.account);
  const role = useSelector(state => state.role);
  const dispatch = useDispatch();
  const history = useHistory();

  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });

  useEffect(() => {
    if (process.env.REACT_APP_DEV) {
      console.log("Admin/useEffect()@props");
    }

    try {
      dispatch(creatorRoles.roleMultiAll());
      dispatch(creatorAccounts.getUser({ history: history }));
    } catch (e) {
      history.push('/');
    }
  }, [dispatch, history]);

  // ref for main panel div
  const mainPanel = React.createRef();

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/contol-panel/full-screen-maps";
  };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getRoutes = routes => {
    if (process.env.REACT_APP_DEV) {
      console.log("Admin/getRoutes(routes)");
    }

    return routes.map((prop, key) => {
      // Permission
      let pAllow = [];
      if (accou.user && role) {
        if (prop.code) {
          let rolesRaw = role.allRoles.filter((ro) => {
            return accou.user.authorities.indexOf(ro.code) >= 0;
          })
          let rolesFlat = rolesRaw.map((ro) => {
            return ro.permissionList.map((item2) => { return item2.code })
          }).flat()
          pAllow = [...(new Set(rolesFlat))];
          if (!pAllow || pAllow.length <= 0) {
            return;
          }
        }
      }

      if (prop.code && pAllow.length <= 0) {
        return (<div></div>);
      }

      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/contol-panel") {

        const ComponentPar = prop.component;

        return (
          <Route
            path={prop.layout + prop.path}
            // Make infinite render
            // component={(props) => <ComponentPar {...props} account={accou.responseData} />}
            // component={(props) => <ComponentPar {...props} />}
            key={key}
          >
            <ComponentPar {...props} />
          </Route>
        );
      } else {
        return null;
      }
    });
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Elecdove"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        {accou.loading && <LoadingIndicator />}
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/contol-panel" to="/contol-panel/user-page" />
              </Switch>
            </div>
          </div>
        ) : (
            <div className={classes.map}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/contol-panel" to="/contol-panel/user-page" />
              </Switch>
            </div>
          )}
        {getRoute() ? <Footer content={<FooterStyleA />} fluid /> : null}
      </div>
    </div>
  );
}
