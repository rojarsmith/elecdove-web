/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Email from "@material-ui/icons/Email";
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
import { actionMessages } from "redux/action";
import { creatorAuthentications } from "redux/creator";
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import messagePageStyle from "assets/jss/material-kit-pro-react/views/messagePageStyle.js";
import image from "assets/img/bg7.jpg";
import { ReactComponent as IconOk } from "assets/img/icon-ok.svg";
import { ReactComponent as IconFail } from "assets/img/icon-fail.svg";

const useStyles = makeStyles(messagePageStyle);

export default function SignUpPage({ ...rest }) {
  const authe = useSelector(state => state.authentication);
  const message = useSelector(state => state.message);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    captchaError: false,
    captchaErrorMessage: '',
    iagreeError: false,
    iagreeErrorMessage: ''
  });
  const [typeSignUp, settypeSignUp] = useState(message.type === 'signup');
  const [checked, setChecked] = useState([-1]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("typeSignUp=" + typeSignUp);
    if (!typeSignUp) {
      history.replace('/');
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

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

    // handleInputValidateLogic("iagree");
  };



  const classes = useStyles();

  function handleChange(event) {
    const { id, value } = event.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleInputValidate(event) {
    if (process.env.REACT_APP_DEV) console.log()
    // handleInputValidateLogic(event.target.id);
  }

  const handleInputFocus = (event) => {
    const { id } = event.target;
    setInputs(inputs => ({ ...inputs, [id + 'Error']: false }));
  }


  function handleSubmit(event) {
    event.preventDefault();

    if (checkInputComplete(['username', 'email', 'password', 'passwordagain', 'captcha', 'iagree']) === false) {
      return false;
    }

    const { from } = location.state || { from: { pathname: "/" } };
    console.log(location);
    console.log(from);
    dispatch(creatorAuthentications.signup(inputs));
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
                <h2 className={classes.cardTitle}>Sign Up Completed</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={10} md={10}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Confirm E-mail"
                        description={"Open your e-mail to click the link to confirm the account. Resend confirm e-mail when sign in."}
                        icon={Email}
                        iconColor="info"
                      />
                      <div style={{
                        height: '8.4em', width: '8.4em', display: "block", margin: "auto"
                      }}>
                        <IconOk></IconOk>
                      </div>
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
