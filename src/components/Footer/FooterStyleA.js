import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-pro-react/components/footerStyleAStyle.js";

const useStyles = makeStyles(styles);

export default function FooterStyleA(props) {
  const { theme, className } = props;
  const classes = useStyles();
  const themeType =
    theme === "transparent" || theme == undefined ? false : true;

  return (
    <div>
      <div className={classes.left}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <Link to="/contact-us" className={classes.block}>
              Contact us
            </Link>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <Link to="/about-us" className={classes.block}>
              About us
            </Link>
          </ListItem>
        </List>
      </div>
      <div className={classes.right}>
        &copy; {1900 + new Date().getYear()} , made with{" "}
        <Favorite className={classes.icon} /> by{" "}
        <a
          href="http://www.edtc.com/"
          target="_blank"
        >
          Rojar Smith
              </a>{" "}
              .
      </div>
    </div>
  );
}