/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link, NavLink, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Person from "@material-ui/icons/Person";
import PersonAdd from "@material-ui/icons/PersonAdd";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { creatorAuthentications } from "redux/creator";
import { actionModals, actionMessages } from "redux/action";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const authe = useSelector(state => state.authentication);
  const dispatch = useDispatch();
  const history = useHistory();

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };

  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  function handleClickLogout(event) {
    event.preventDefault();

    dispatch(creatorAuthentications.logout());
    dispatch({ type: actionModals.OPEN_LOGOUT });
  }

  function debug1(event) {
    event.preventDefault();

    // dispatch({ type: actionModals.OPEN_LOGOUT });
  }

  function debug2(event) {
    event.preventDefault();


    // dispatch(creatorAuthentications.signup({ username: 'aaa111', password: 'bbbb1111', email: 'rojarsmith@gmail.com'}));
    // dispatch(creatorAuthentications.signup({ username: 'aaa1112', password: 'bbbb1111', email: 'rojarsmith2@gmail.com'}));

    // dispatch({ type: actionMessages.TO_MESSAGE, action: { type: 'signup' } });
    // history.replace("/message-page");

    history.push("/confirm-account/:token");
  }

  const { dropdownHoverColor } = props;
  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {!authe.loggedIn && (
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} component={NavLink} to="/login-page">
            <Fingerprint className={classes.icons} />Sign In
        </Button>
        </ListItem>
      )}
      {!authe.loggedIn && (
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} component={NavLink} to="/signup-page">
            <PersonAdd className={classes.icons} />Sign Up
        </Button>
        </ListItem>
      )}
      {authe.loggedIn && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="USER"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link className={classes.dropdownLink}>
                Profile
            </Link>,
              <Link
                className={classes.dropdownLink}
                onClick={handleClickLogout}>
                Sign out
            </Link>
            ]}
          />
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <Button badgeContent={1} badgeContentMax={99} color="transparent" className={classes.navLink} component={NavLink} to="/shopping-cart-page">
          <ShoppingCart className={classes.icons} />Shopping Cart
        </Button>
      </ListItem>
      {
        process.env.REACT_APP_DEV &&
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} onClick={debug1}>
            Debug1
          </Button>
        </ListItem>
      }
      {
        process.env.REACT_APP_DEV &&
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} onClick={debug2}>
            Debug2
          </Button>
        </ListItem>
      }
      {
        process.env.REACT_APP_DEV &&
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} onClick={debug1}>
            Debug3
          </Button>
        </ListItem>
      }
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
