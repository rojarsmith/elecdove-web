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
import { useSelector } from "react-redux";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import labPageStyle from "assets/jss/material-kit-pro-react/views/labPageStyle.js";
import image from "assets/img/bg7.jpg";

import ImageGallery from "react-image-gallery";

// images
import cardProduct1 from "assets/img/examples/card-product1.jpg";
import cardProduct3 from "assets/img/examples/card-product3.jpg";
import cardProduct4 from "assets/img/examples/card-product4.jpg";
import cardProduct2 from "assets/img/examples/card-product2.jpg";
import product1 from "assets/img/examples/product1.jpg";
import product2 from "assets/img/examples/product2.jpg";
import product3 from "assets/img/examples/product3.jpg";
import product4 from "assets/img/examples/product4.jpg";

const useStyles = makeStyles(labPageStyle);

export default function LabPage({ ...rest }) {
  const authe = useSelector(state => state.authentication);
  const message = useSelector(state => state.message);
  const [typeSignUp, setTypeSignUp] = useState(message.type === 'signup');
  const [typeConfirmMail, setTypeConfirmMail] = useState(rest.type === 'confirmmail');
  const [typeResetPassword, setTypeResetPassword] = useState(message.type === 'resetpassword');
  const [typeResetPasswordToken, setTypeResetPasswordToken] = useState(message.type === 'resetpasswordtoken');
  const classes = useStyles();

  const images = [
    {
      original: product3,
      thumbnail: product3
    },
    {
      original: product4,
      thumbnail: product4
    },
    {
      original: product1,
      thumbnail: product1
    },
    {
      original: product2,
      thumbnail: product2
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  const renderTitle = (param) => {
    if (typeSignUp) {
      return "Sign Up Completed";
    }
    else if (typeConfirmMail) {
      return "Confirm Mail";
    }
    else if (typeResetPassword) {
      return "Begin Reset Password";
    }
    else if (typeResetPasswordToken) {
      return "New Password Completed";
    }
  }

  return (
    <div className={classes.labPage}>
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
                      Lab

                    </GridItem>
                    <GridItem xs={12} sm={10} md={10}>
                      <ImageGallery
                        showFullscreenButton={false}
                        showPlayButton={false}
                        startIndex={3}
                        items={images}
                        showThumbnails={true}
                        renderLeftNav={(onClick, disabled) => {
                          return (
                            <button
                              className='image-gallery-left-nav'
                              disabled={disabled}
                              onClick={onClick}
                            />
                          );
                        }}
                        renderRightNav={(onClick, disabled) => {
                          return (
                            <button
                              className='image-gallery-right-nav'
                              disabled={disabled}
                              onClick={onClick}
                            />
                          );
                        }}
                      />

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
