import React, { Component } from 'react';

//Alert
import { withAlert } from 'react-alert';

//Router
import { Route, Switch, withRouter } from 'react-router-dom';

//Page
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route path="/ecommerce-page" component={EcommercePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/signup-page" component={SignupPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
