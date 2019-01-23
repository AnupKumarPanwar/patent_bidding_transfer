import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { SecureRoute } from 'react-route-guard';

import "./App.scss";
// import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css"

import Registration from "./components/registrationPage";
import LandingPage from "./components/landingPage";
import Header from "./components/navbar";
import DashBoard from "./components/dashboard";
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
        <Header />
        <Switch>
          <SecureRoute path={"/dashboard"} render={() => <DashBoard changeAuth={this.changeAuthorization} authtoken={this.state.isAuthed} />} />
          <Route path={"/register"} component={Registration} />
          <Route path={"/"} exact render={(routeProps) => <LandingPage {...routeProps} changeAuth={this.changeAuthorization} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
