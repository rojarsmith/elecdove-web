import React, { Component } from 'react';

//Alert
import { withAlert } from 'react-alert';

//Router
import { Route, Switch, withRouter } from 'react-router-dom';

//Page
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login-page" component={LoginPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
