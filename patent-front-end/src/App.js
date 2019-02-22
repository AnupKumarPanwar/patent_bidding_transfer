import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { SecureRoute } from 'react-route-guard';

import store from "./store/configureStore";
import { Provider } from 'react-redux';

import "./App.scss";
// import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css"

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Registration from "./components/pages/registrationPage";
import LandingPage from "./components/pages/landingPage";
import Header from "./components/common/navbar";
import DashBoard from "./components/pages/dashboard";
// import { NavigationDrawer } from 'react-md';

class App extends Component {

  state = {
    isAuthed: false
  }

  changeAuthorization = (variable) => {
    this.setState({ isAuthed: variable })
  }

  render() {

    return (

      <div className="App">
        <Provider store = {store}>
        <Header />
        <Switch>
          <Route path={"/dashboard"} component = {DashBoard} />
          <Route path={"/register"} component={Registration} />
          <Route path={"/"} exact render={(routeProps) => <LandingPage {...routeProps} />} />
        </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
