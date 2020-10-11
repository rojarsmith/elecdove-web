/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderBrand from "components/Header/HeaderBrand.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import FooterStyleA from "components/Footer/FooterStyleA.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { creatorAuthentications } from "redux/creator";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import messagePageStyle from "assets/jss/material-kit-pro-react/views/messagePageStyle.js";
import image from "assets/img/bg7.jpg";
import { ReactComponent as IconOk } from "assets/img/icon-ok.svg";
import { ReactComponent as IconFail } from "assets/img/icon-fail.svg";

const useStyles = makeStyles(messagePageStyle);

export default function SignUpPage({ ...rest }) {
  const authe = useSelector(state => state.authentication);
  const message = useSelector(state => state.message);
  const [typeSignUp, setTypeSignUp] = useState(message.type === 'signup');
  const [typeConfirmMail, setTypeConfirmMail] = useState(rest.type === 'confirmmail');
  const [typeResetPassword, setTypeResetPassword] = useState(message.type === 'resetpassword');
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (!typeSignUp && !typeConfirmMail && !typeResetPassword) {
      history.replace('/');
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (typeConfirmMail) {
      dispatch(creatorAuthentications.confirmMail(token));
    }
  }, []);

  const renderTitle = (param) => {
    if (typeSignUp) {
      return "Sign Up Completed";
    }
    else if (typeConfirmMail) {
      return "Confirm Mail";
    }
    else if(typeResetPassword){
      return "Begin Reset Password";
    }
  }

  const renderItem1 = (param) => {
    if (typeSignUp) {
      return <div>Open your e-mail to click the link to confirm the account.<br />
             Resend confirm e-mail when sign in.</div>;
    }
    else if (typeConfirmMail && authe.loading) {
      return "Confirming ...";
    }
    else if (typeConfirmMail) {
      if (authe.confirmed === 0) {
        return authe.confirmMessage;
      }
      else if (authe.confirmed === 1) {
        return <div>{authe.confirmMessage}<br />Sign in your account and enjoy.</div>;
      }
    }
    else if(typeResetPassword){
      return <div>{authe.resetPasswordMessage}<br />You will receive the e-mail and click the link for reseting.</div>;
    }
  }

  const renderItem3 = (param) => {
    if (typeSignUp) {
      return <IconOk />;
    }
    else if (typeConfirmMail && authe.loading) {
      return "";
    }
    else if (typeConfirmMail) {
      if (authe.confirmed === 0) {
        return <IconFail />;
      }
      else if (authe.confirmed === 1) {
        return <IconOk />;
      }
    }
    else if (typeResetPassword) {
      if (authe.resetPassword === 0) {
        return <IconFail />;
      }
      else if (authe.resetPassword === 1) {
        return <IconOk />;
      }
    }
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
                <h2 className={classes.cardTitle}>
                  {renderTitle()}
                </h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={10} md={10}>
                      <div className={classes.textCenter}>
                        <div className={classes.typo}>
                          {renderItem1()}
                        </div>
                      </div>
                      <div style={{
                        height: '8.4em', width: '8.4em', display: "block", margin: "auto"
                      }}>
                        {renderItem3()}
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
