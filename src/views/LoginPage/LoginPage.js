/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
//import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components
import Header from "components/Header/Header.js";
import HeaderBrand from "components/Header/HeaderBrand.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import FooterStyleA from "components/Footer/FooterStyleA.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg7.jpg";

import { useDispatch, useSelector } from "react-redux";

import { userActions } from "redux/actions";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const { username, password } = inputs;
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();


  function handleChange(e) {
    const { id, value } = e.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('aaa');
    console.log(inputs);
    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch( userActions.login(username, password, from));
    }
  }

  return (
    <div>
      <Header
        brand={<HeaderBrand />}
        absolute
        color="transparent"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form} name="form" method="POST" onSubmit={handleSubmit}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus-g" />
                      </Button>
                    </div> */}
                  </CardHeader>
                  {/* <p className={classes.description + " " + classes.textCenter}>
                    Or Be Classical
                  </p> */}
                  <CardBody signup>
                    <CustomInput
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "User Name",
                        type: "text",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Face className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: (event) => handleChange(event)
                      }}
                    />
                    <CustomInput
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Password",
                        type: "password",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onChange: (event) => handleChange(event)
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        <Footer className={classes.footer} content={<FooterStyleA />} />

      </div>
    </div>
  );
}
