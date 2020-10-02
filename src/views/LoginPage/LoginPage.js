/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Icon from "@material-ui/core/Icon";
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
import Danger from "components/Typography/Danger.js";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/actions";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    usernameError: false,
    usernameErrorMessage: '',
    passwordError: false,
    passwordErrorMessage: ''
  });
  const {
    username,
    password } = inputs;
  const authe = useSelector(state => state.authentication);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    dispatch(userActions.initial());
  }, []);

  const classes = useStyles();

  function handleChange(event) {
    const { id, value } = event.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // setLoading(true);

    if (checkInputComplete(['username', 'password']) === false) {
      //this.props.alert.warning("Input not completed!");
      return false;
    }

    console.log(inputs);

    console.log(authe);

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      console.log(location);
      console.log(from);
      dispatch(userActions.login(username, password, from));
      // setLoading(false);
      console.log(authe);
      //history.replace(from);
    }
  }

  // function handleClick(e){
  //   e.preventDefault();

  //   history.replace('/');
  // }

  function handleInputValidate(event) {
    console.log(event.target.id);
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

  return (
    <div>
      {authe.loading && <LoadingIndicator />}
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
                  </CardBody>
                  <div className={classes.textCenter}>
                    <div className={classes.typo}>
                      {authe.loginFailed ? (
                        <Danger>Login Failed<br />
                        Check user name and password again.
                        </Danger>
                      ) : null}
                    </div>
                  </div>
                  <div className={classes.textCenter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Login
                    </Button>
                    <Link to="/signup-page" className="btn btn-link" color="primary" size="lg" style={{ margin: ".3125rem 1px", padding: "1.125rem 2.25rem" }}>Register</Link>
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
