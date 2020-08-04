import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Alert
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//Redux
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { personReducer } from './redux/reducers'

//Router
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from 'react-router-dom';

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

//Alert
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

//Redux
const logger = createLogger();

const allReducer = combineReducers({
  person: personReducer
})

const store = createStore(allReducer, applyMiddleware(thunk, logger));
console.log(store);

//Router
var history = createBrowserHistory();

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App store={store} />
          </AlertProvider>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
