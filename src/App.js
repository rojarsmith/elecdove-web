import React, { Component } from 'react';

//Redux
// import {
//   LOADING_BEGIN,
//   LOADING_END,
//   SET_ACCOUNT,
//   // CLEAR_ACCOUNT
// } from 'redux/actions';

//Communication
import { getCurrentUser } from 'util/RemoteAPIUtils';

//Alert
import { withAlert } from 'react-alert';

//Router
import { Route, Switch, withRouter } from 'react-router-dom';

//Page
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

//Layout
import AdminLayout from "layouts/Admin.js";

//Debug
import AuthService from "service/AuthService";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      user: {},
      payload: {},
      payload2: {}
    };

    //this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
  }

  loadCurrentlyLoggedInUser = () => {
    // this.props.store.dispatch({ type: LOADING_BEGIN, data: null });

    getCurrentUser()
      .then(response => {
        // this.props.store.dispatch({ type: SET_ACCOUNT, data: response });
        this.props.alert.show("Get !");
        //this.props.store.dispatch({ type: LOADING_END, data: null });
      }).catch(error => {
        // this.props.store.dispatch({ type: LOADING_END, data: null });
        if (error.status !== 401) {
          this.props.alert.show("Get account failed !");
        }
        //this.props.store.dispatch({ type: LOADING_END, data: null });
      });
    // this.props.store.dispatch({ type: LOADING_END, data: null });
  }

  componentDidMount = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log("App/componentDidMount");
    }

    const promiseLogin = async () => {
      const response = await AuthService.login({ username: 'aaa111', password: 'bbb111' });
      console.log(response);
      this.setState({ payload: response });

    };

    // promiseLogin()

    var user = localStorage.getItem('user');
    console.log(user);

    const promiseSignUp = async () => {
      const response = await AuthService.signUp({
        name: 'aaaaa',
        email: 'rojarsmith@live.com',
        password: 'ccc11111'
      });
      console.log(response);
      this.setState({ payload2: response });

    };

    // promiseSignUp();

    console.log(this.state.payload2);

    //this.loadCurrentlyLoggedInUser();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route path="/ecommerce-page" component={EcommercePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/shopping-cart-page" component={ShoppingCartPage} />
          <Route path="/signup-page" component={SignupPage} />
          <Route path="/admin" component={AdminLayout} />
          {/* <Route path="/control-panel" component={AdminLayout} /> */}
          {/* <Route path="/" component={LandingPage} /> */}
          <Route path="/" component={EcommercePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
