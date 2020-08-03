import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

import { web } from 'variables/general';

import { ReactComponent as ReactLogo } from '../../assets/img/logo.svg';

const useStyles = makeStyles(styles);

export default function HeaderBrand(props) {
  const classes = useStyles();

  return (
    <div>
      <Link className={classes.title} to="/">
        <ReactLogo className={classes.icons} />{web.BRAND}
      </Link>
    </div>
  );
}
