import React, { Component } from 'react';
import './App.css';

//Alert
import { withAlert } from 'react-alert';

//Router
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
