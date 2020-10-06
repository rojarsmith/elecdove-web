/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Payment from "@material-ui/icons/Payment";
import ContactSupport from "@material-ui/icons/ContactSupport";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import DoneAllOutlined from '@material-ui/icons/DoneAllOutlined';
import EnhancedEncryption from '@material-ui/icons/EnhancedEncryption';
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
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
// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionModals } from "redux/action";
import { creatorAuthentications } from "redux/creator";
import RCG from "components/ReactCaptchaGenerator";
import ValidationUtils from "util/ValidationUtils";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(signupPageStyle);

export default function SignUpPage({ ...rest }) {
  const authe = useSelector(state => state.authentication);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    passwordagain: '',
    captcha: '',
    iagree: false,
    gsbutton: true,
    usernameError: false,
    usernameErrorMessage: '',
    email: '',
    emailError: '',
    emailErrorMessage: '',
    passwordError: false,
    passwordErrorMessage: '',
    passwordagainError: false,
    passwordagainErrorMessage: '',
    captchaError: false,
    captchaErrorMessage: '',
    iagreeError: false,
    iagreeErrorMessage: ''
  });
  const [checked, setChecked] = useState([-1]);
  const [captcha, setCaptcha] = useState("");
  const dispatch = useDispatch();

  const handleToggle = (event) => {
    let { event: e, payload: value } = event;
    e.preventDefault();

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    handleInputValidateLogic("iagree");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();

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
      case 'username':
        if (inputs.username === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input user name."
          }));
          return false;
        }
        else if (ValidationUtils.validateUsername(inputs.username) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must 5~21 chars, 0~9, a~Z."
          }));
          return false;
        }
        break;
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
      case 'password':
        if (inputs.password === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input password."
          }));
          return false;
        }
        else if (ValidationUtils.validatePassword(password) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Must 8-16 characters with no space."
          }));
          return false;
        }
        break;
      case 'passwordagain':
        if (inputs.passwordagain === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Please input password again."
          }));
          return false;
        }
        else if (inputs.passwordagain !== inputs.password) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
            [itemname + 'ErrorMessage']: "Again must the same."
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
      case 'iagree':
        if (checked.length === 1 && checked[checked.length - 1] === -1) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "Error"]: true,
          }));
          setInputs(inputs => ({ ...inputs, gsbutton: false }));
          return false;
        }
        else {
          setInputs(inputs => ({ ...inputs, gsbutton: true }));
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

  function handlerTerms(event) {
    event.preventDefault();

    let a = 56;
    dispatch({ type: actionModals.OPEN_TERMS });
  }

  return (
    <div>
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
                <h2 className={classes.cardTitle}>Sign Up</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Order"
                        description="You must sign up the accout for paying your order."
                        icon={Payment}
                        iconColor="info"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Support"
                        description="Get more much advance help."
                        icon={ContactSupport}
                        iconColor="primary"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form className={classes.form}>
                        <CustomInput
                          id="username"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            placeholder: "User Name",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event),
                            onFocus: (event) => handleInputFocus(event)
                          }}
                          error={inputs.usernameError}
                          labelText={inputs.usernameErrorMessage}
                        />
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
                          id="password"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            placeholder: "Password",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event),
                            onFocus: (event) => handleInputFocus(event)
                          }}
                          error={inputs.passwordError}
                          labelText={inputs.passwordErrorMessage}
                        />
                        <CustomInput
                          id="passwordagain"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            placeholder: "Password again",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  <EnhancedEncryption className={classes.inputIconsColor} />
                                </Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) => handleChange(event),
                            onBlur: (event) => handleInputValidate(event),
                            onFocus: (event) => handleInputFocus(event)
                          }}
                          error={inputs.passwordagainError}
                          labelText={inputs.passwordagainErrorMessage}
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

                        {inputs.iagreeError && !inputs.gsbutton ? (
                          <div className={classes.textCenter}>
                            <Danger>
                              Please read terms and click I agree.
                            </Danger>
                          </div>
                        ) : null}
                        <div className={classes.textCenter}>
                          <FormControlLabel
                            classes={{
                              label: classes.label
                            }}
                            control={
                              <Checkbox
                                id="iagree"
                                tabIndex={-1}
                                onClick={(event) => handleToggle({ event: event, payload: 1 })}
                                checkedIcon={
                                  <Check className={classes.checkedIcon} />
                                }
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{
                                  checked: classes.checked,
                                  root: classes.checkRoot
                                }}
                                checked={checked.indexOf(1) !== -1 ? true : false}
                              />
                            }
                            label={

                              <span>
                                I agree to the{" "}
                                <a href="#gsbutton" onClick={handlerTerms}>terms and conditions</a>.
                            </span>
                            }
                          />
                        </div>
                        <div id="gsbutton" className={classes.textCenter}>
                          <Button disabled={inputs.gsbutton} round color="primary" type="submit">
                            Get started
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
