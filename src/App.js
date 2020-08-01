import React, { Component } from 'react';
import './App.css';

//Alert
import { withAlert } from 'react-alert';

//Router
import { Route, Switch, withRouter } from 'react-router-dom';

//Page
import LandingPage from "views/LandingPage/LandingPage.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
