/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ContactSupport from "@material-ui/icons/ContactSupport";
import Email from "@material-ui/icons/Email";
import DoneAllOutlined from '@material-ui/icons/DoneAllOutlined';
import EnhancedEncryption from '@material-ui/icons/EnhancedEncryption';
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
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Danger from "components/Typography/Danger.js";
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionModals, actionAuthentications, actionMessages } from "redux/action";
import { creatorAuthentications } from "redux/creator";
import RCG from "components/ReactCaptchaGenerator";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import ValidationUtils from "util/ValidationUtils";
import resetPasswordPageStyle from "assets/jss/material-kit-pro-react/views/ResetPasswordPageStyle.js";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(resetPasswordPageStyle);

export default function ResetPasswordPage({ ...rest }) {
  const authe = useSelector(state => state.authentication);
  const [inputs, setInputs] = useState({
    email: '',
    emailError: '',
    emailErrorMessage: '',
    captcha: '',
    captchaError: false,
    captchaErrorMessage: '',
  });
  const [captcha, setCaptcha] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: actionAuthentications.ASK_FORGET_INITIAL });

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (authe.rp) {
      dispatch({ type: actionMessages.TO_MESSAGE, action: { type: 'resetpassword' } });
      history.push("/message-page");
    }
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleInputValidate(event) {
    if (process.env.REACT_APP_DEV) console.log()
    handleInputValidateLogic(event.target.id);
  }

  const handleInputFocus = (event) => {
    const { id } = event.target;
    setInputs(inputs => ({ ...inputs, [id + 'Error']: false }));
  }

  function handleInputValidateLogic(itemname) {
    switch (itemname) {
      case 'email':
        if (inputs.email === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input E-mail."
          }));
          return false;
        }
        else if (ValidationUtils.validateEmail(inputs.email) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Invalid E-mail."
          }));
          return false;
        }
        break;
      case 'captcha':
        if (inputs.captcha === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input captcha."
          }));
          return false;
        }
        else if (ValidationUtils.validateCaptcha(inputs.captcha, captcha)) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must the same, non case sensitive."
          }));
          return false;
        }
        break;
      default:
        return false;
    }

    setInputs(inputs => ({
      ...inputs,
      [itemname + "Error"]: false,
      [itemname + 'ErrorMessage']: ""
    }));
    return true;
  }

  const resultCaptcha = (text) => {
    console.log(text);
    setCaptcha(text);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (checkInputComplete(['email', 'captcha']) === false) {
      return false;
    }

    const { from } = location.state || { from: { pathname: "/" } };
    console.log(location);
    console.log(from);

    dispatch(creatorAuthentications.askResetPassword(inputs.email));
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

  return (
    <div>
      {authe.loading && <LoadingIndicator />}
      <Header
        brand={<HeaderBrand />}
        absolute
        color="transparent"
        links={<HeaderLinks dropdownHoverColor="info" />}
        {...rest}
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
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Reset Password</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Find Password"
                        description="You will receive the e-mail for recoverying."
                        icon={ContactSupport}
                        iconColor="primary"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form className={classes.form} method="POST" onSubmit={handleSubmit}>
                        <CustomInput
                          id="email"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            placeholder: "Email",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event),
                            onFocus: (event) => handleInputFocus(event)
                          }}
                          error={inputs.emailError}
                          labelText={inputs.emailErrorMessage}
                        />
                        <CustomInput
                          id="captcha"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            placeholder: "Captcha",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  <DoneAllOutlined className={classes.inputIconsColor} />
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event),
                            onFocus: (event) => handleInputFocus(event)
                          }}
                          error={inputs.captchaError}
                          labelText={inputs.captchaErrorMessage}
                        />
                        <div className={classes.textCenter}>
                          <RCG result={resultCaptcha} toggleRefresh={authe.loading} ></RCG>
                        </div>
                        <div id="gsbutton" className={classes.textCenter}>
                          <Button round color="primary" type="submit">
                            Reset
                          </Button>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer className={classes.footer} content={<FooterStyleA />} />
      </div>
    </div>
  );
}
