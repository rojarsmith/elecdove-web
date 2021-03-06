/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderBrand from "components/Header/HeaderBrand.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import FooterStyleA from "components/Footer/FooterStyleA.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/card-product1.jpg";
import cardProduct3 from "assets/img/examples/card-product3.jpg";
import cardProduct4 from "assets/img/examples/card-product4.jpg";
import cardProduct2 from "assets/img/examples/card-product2.jpg";
import product1 from "assets/img/examples/product1.jpg";
import product2 from "assets/img/examples/product2.jpg";
import product3 from "assets/img/examples/product3.jpg";
import product4 from "assets/img/examples/product4.jpg";

const useStyles = makeStyles(productStyle);

export default function ProductPage({ ...rest }) {
  const [colorSelect, setColorSelect] = React.useState("0");
  const [sizeSelect, setSizeSelect] = React.useState("0");
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
  return (
    <div className={classes.productPage}>
      <Header
        brand={<HeaderBrand />}
        absolute
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "rose"
        }}
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        {...rest}
      />
      <Parallax
        image={require("assets/img/bg6.jpg")}
        filter="rose"
        className={classes.pageHeader}
      >
        <div className={classes.container}>
          <GridContainer className={classes.titleRow}>
            <GridItem md={4} className={classes.mlAuto}>
              <Button color="white" className={classes.floatRight}>
                <ShoppingCart /> 0 items
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <ImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  startIndex={3}
                  items={images}
                  showThumbnails={true}
                  renderLeftNav={(onClick,disabled) => {
                    return (
                      <button
                        className='image-gallery-left-nav'
                        disabled={disabled}
                        onClick={onClick}
                      />
                    );
                  }}
                  renderRightNav={(onClick,disabled) => {
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
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>Becky Silk Blazer</h2>
                <h3 className={classes.mainPrice}>$335</h3>
                <Accordion
                  active={0}
                  activeColor="rose"
                  collapses={[
                    {
                      title: "Description",
                      content: (
                        <p>
                          Eres{"'"} daring {"'"}Grigri Fortune{"'"} swimsuit has
                          the fit and coverage of a bikini in a one-piece
                          silhouette. This fuchsia style is crafted from the
                          label{"'"}s sculpting peau douce fabric and has
                          flattering cutouts through the torso and back. Wear
                          yours with mirrored sunglasses on vacation.
                        </p>
                      )
                    },
                    {
                      title: "Designer Information",
                      content: (
                        <p>
                          An infusion of West Coast cool and New York attitude,
                          Rebecca Minkoff is synonymous with It girl style.
                          Minkoff burst on the fashion scene with her
                          best-selling {"'"}Morning After Bag{"'"} and later
                          expanded her offering with the Rebecca Minkoff
                          Collection - a range of luxe city staples with a {'"'}
                          downtown romantic{'"'} theme.
                        </p>
                      )
                    },
                    {
                      title: "Details and Care",
                      content: (
                        <ul>
                          <li>Storm and midnight-blue stretch cotton-blend</li>
                          <li>
                            Notch lapels, functioning buttoned cuffs, two front
                            flap pockets, single vent, internal pocket
                          </li>
                          <li>Two button fastening</li>
                          <li>84% cotton, 14% nylon, 2% elastane</li>
                          <li>Dry clean</li>
                        </ul>
                      )
                    }
                  ]}
                />
                <GridContainer className={classes.pickSize}>
                  <GridItem md={6} sm={6}>
                    <label>Select color</label>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={colorSelect}
                        onChange={event => setColorSelect(event.target.value)}
                        inputProps={{
                          name: "colorSelect",
                          id: "color-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="0"
                        >
                          Rose
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="1"
                        >
                          Gray
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="2"
                        >
                          White
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem md={6} sm={6}>
                    <label>Select size</label>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={sizeSelect}
                        onChange={event => setSizeSelect(event.target.value)}
                        inputProps={{
                          name: "sizeSelect",
                          id: "size-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="0"
                        >
                          Small
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="1"
                        >
                          Medium
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="2"
                        >
                          Large
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.pullRight}>
                  <Button round color="rose">
                    Add to Cart &nbsp; <ShoppingCart />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer theme="dark" content={<FooterStyleA />} />
    </div>
  );
}
