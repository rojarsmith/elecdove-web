import React, { Component } from 'react';
//Communication
import { getCurrentUser } from 'util/RemoteAPIUtils';
//Alert
import { withAlert } from 'react-alert';
//Router
import { Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
//Page
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import MessagePage from "views/MessagePage/MessagePage";
import ProductPage from "views/ProductPage/ProductPage";
import NewPasswordPage from "views/NewPasswordPage/NewPasswordPage"
import ResetPasswordPage from "views/ResetPasswordPage/ResetPasswordPage";
// Component
import Button from "components/CustomButtons/Button.js";
import { ModalLogout, ModalTerms, ModalSimple, ModalError } from "components/Modal";
//Layout
import AdminLayout from "layouts/Admin.js";

//Debug
import { creatorAuthentications } from "redux/creator";
import AuthService from "service/AuthService";
import { actionModals } from "redux/action";

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
    if (process.env.REACT_APP_DEV) {
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

  componentDidUpdate() {

  }

  signout = () => {
    this.props.store.dispatch({ type: actionModals.CLOSE_LOGOUT });
    this.props.history.replace("/");
  }

  afterModalError = () => {
    this.props.store.dispatch({ type: actionModals.CLOSE_ERROR });
  }

  afterModalSimple = () => {
    this.props.store.dispatch({ type: actionModals.CLOSE_SIMPLE });
  }

  afterModalTerms = () => {
    this.props.store.dispatch({ type: actionModals.CLOSE_TERMS });
  }

  emptyfunc = () => {

  }

  debug1 = () => {
    console.log("debug1");
    this.props.store.dispatch(creatorAuthentications.logout());
  }

  debug2 = () => {
    console.log("debug2");
    //  console.log(actionAuthentications);
    // // this.props.store.dispatch(actionAuthentications.LOGOUT_SUCCESS);
    //  this.props.store.dispatch(creatorAuthentications.initial());
    this.props.store.dispatch({ type: actionModals.CLOSE_LOGOUT });
    // const { from } = location.state || { from: { pathname: "/" } };
    // history.replace(from);
  }

  render() {
    return (
      <div>
        {
          <div>
            <ModalLogout open={this.props.store.getState().modal.logoutOpen} afterclose={this.signout} />
            <ModalSimple open={this.props.store.getState().modal.simpleOpen} afterclose={this.afterModalSimple} message={this.props.store.getState().modal.message} />
            <ModalTerms open={this.props.store.getState().modal.termsOpen} afterclose={this.afterModalTerms} />
            <ModalError open={this.props.store.getState().modal.errorOpen} afterclose={this.afterModalError} message={this.props.store.getState().modal.message} />
          </div>
        }
        <Switch>
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route path="/ecommerce-page" component={EcommercePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/shopping-cart-page" component={ShoppingCartPage} />
          <Route path="/signup-page" component={SignupPage} />
          <Route path="/message-page" component={MessagePage} />
          <Route path="/product-page" component={ProductPage} />
          <Route path="/confirm-account/:token" render={(props) => <MessagePage type="confirmmail" {...props} />} />
          <Route path="/reset-password/:token" render={(props) => <NewPasswordPage {...props} />} />
          <Route path="/reset-password" render={(props) => <ResetPasswordPage {...props} />} />
          <Route path="/contol-panel"><AdminLayout {...this.props} /></Route>
          {/* <Route path="/control-panel" component={AdminLayout} /> */}
          {/* <Route path="/" component={LandingPage} /> */}
          <Route path="/" component={EcommercePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withAlert()(App));
