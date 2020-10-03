/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import Face from "@material-ui/icons/Face";
import DoneAllOutlined from '@material-ui/icons/DoneAllOutlined';
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
import Danger from "components/Typography/Danger.js";
import Info from "components/Typography/Info";
import Delay from "components/Delay";
// Redux
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { creatorAuthentications } from "redux/creator";
import RCG from "components/ReactCaptchaGenerator";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    captcha: '',
    usernameError: false,
    usernameErrorMessage: '',
    passwordError: false,
    passwordErrorMessage: '',
    captchaError: false,
    captchaErrorMessage: ''
  });
  const authe = useSelector(state => state.authentication);
  const [seconds, setSeconds] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [hidden, setHidden] = useState("");
  const [captcha, setCaptcha] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    dispatch(creatorAuthentications.initial());
  }, []);

  useEffect(() => {
    let timeoutID;
    if (authe.loginSuccess) {
      if (seconds >= 0) {
        timeoutID = setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(0);
      }
    }
    return () => {
      clearInterval(timeoutID);
    }
  });

  const classes = useStyles();

  function handleChange(event) {
    const { id, value } = event.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleOK(event) {
    event.preventDefault();

    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(hidden);
    if (hidden === "logout") {
      dispatch(creatorAuthentications.logout());
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
      return;
    }

    if (checkInputComplete(['username', 'password', 'captcha']) === false) {
      return false;
    }

    setSubmitted(true);
    if (inputs.username && inputs.password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      console.log(location + ' ' + from);
      dispatch(creatorAuthentications.login(inputs.username, inputs.password, from));
      console.log(authe);
    }
  }

  function handleInputValidate(event) {
    handleInputValidateLogic(event.target.id);
  }

  function handleInputValidateLogic(itemname) {
    const { username, password } = inputs;

    switch (itemname) {
      case 'username':
        if (username === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input user name."
          }));
          return false;
        }
        else if (validateUsername(username) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must 5~21 chars, 0~9, a~Z."
          }));
          return false;
        }
        else {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: false,
            [itemname + 'ErrorMessage']: ""
          }));
          return true;
        }
      case 'password':
        if (password === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input password."
          }));
          return false;
        }
        else if (validatePassword(password) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must 8-16 characters with no space."
          }));
          return false;
        }
        else {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: false,
            [itemname + 'ErrorMessage']: ""
          }));
          return true;
        }
      case 'captcha':
        if (inputs.captcha === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input captcha."
          }));
          return false;
        }
        else if (validateCaptcha(inputs.captcha) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must the same, non case sensitive."
          }));
          return false;
        }
        else {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: false,
            [itemname + 'ErrorMessage']: ""
          }));
          return true;
        }
      default:
        return false;
    }
  }

  function checkInputComplete(inputs) {
    var validates = [];

    for (let i = 0; i < inputs.length; i++) {
      validates[i] = handleInputValidateLogic(inputs[i]);
    }

    var result = true;

    for (let i = 0; i < validates.length; i++) {
      result = result && validates[i];
    }

    return result;
  }

  const validateUsername = (value) => {
    const re = /^[a-zA-Z\d]\w{3,19}[a-zA-Z\d]$/;
    return re.test(value);
  }

  const validatePassword = (value) => {
    const re = /^([^\s]){8,16}$/;
    return re.test(value);
  }

  const validateCaptcha = (value) => {
    return value.toUpperCase() === captcha.toUpperCase();
  }

  function result(text) {
    console.log(text);
    setCaptcha(text);
  }

  return (
    <div>
      {authe.loading && submitted && <LoadingIndicator />}
      {authe.loginSuccess &&
        <div>
          <Dialog
            open={authe.loginSuccess}
            //  onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Login Success !"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Happy buying.
         </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleOK}
                color="primary" autoFocus>
                OK ({seconds})
              </Button>
            </DialogActions>
          </Dialog>
          <Delay wait={6000}><Redirect to="/" /></Delay>
        </div>
      }
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
                  </CardHeader>
                  <CardBody signup>
                    {(!authe.loggedIn) && (
                      <div>
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
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event)
                          }}
                          error={inputs.usernameError}
                          labelText={inputs.usernameErrorMessage}
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
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event)
                          }}
                          error={inputs.passwordError}
                          labelText={inputs.passwordErrorMessage}
                        />
                        <CustomInput
                          id="captcha"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "Captcha",
                            type: "Text",
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon className={classes.inputIconsColor}>
                                  <DoneAllOutlined className={classes.inputIconsColor} />
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event)
                          }}
                          error={inputs.captchaError}
                          labelText={inputs.captchaErrorMessage}
                        />
                        <div className={classes.textCenter}>
                          <RCG result={result} toggleRefresh={authe.loading} ></RCG>
                        </div>
                      </div>
                    )}
                  </CardBody>
                  <div className={classes.textCenter}>
                    <div className={classes.typo}>
                      {authe.loginFailed ? (
                        <Danger>Login Failed<br />
                        Check user name and password again.
                        </Danger>
                      ) : null}
                      {authe.loggedIn ? (
                        <div style={{ marginTop: "5vh" }}>
                          <Info>You Are Already Logged In
                        </Info>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className={classes.textCenter} style={{ marginTop: "5vh" }}>
                    {authe.loggedIn ?
                      <Button id="logout" color="primary" size="lg" type="submit" onClick={() => setHidden("logout")}>
                        Logout
                    </Button>
                      :
                      <Button color="primary" size="lg" type="submit">
                        Login
                    </Button>
                    }
                  </div>
                  <div className={classes.textCenter} style={{ marginTop: "5vh" }}>
                    <div className={classes.typo}>
                      <Link to="/signup-page" className="btn btn-link" color="primary" size="lg" style={{ margin: ".3125rem 1px", padding: "1.125rem 2.25rem" }}>Register</Link>
                    </div>
                  </div>
                  <div className={classes.textCenter} style={{ marginTop: "1vh" }}>
                    <div className={classes.typo}>
                      <Link to="/signup-page" className="btn btn-link" color="primary" size="lg" style={{ margin: ".3125rem 1px", padding: "1.125rem 2.25rem" }}>Forgot Password</Link>
                    </div>
                  </div>
                  <div className={classes.textCenter} style={{ marginTop: "5vh" }}>
                    <div className={classes.typo}>
                    </div>
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
