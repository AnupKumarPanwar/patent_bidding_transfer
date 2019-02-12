import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { SecureRoute } from 'react-route-guard';

import store from "./store/configureStore";
import { Provider } from 'react-redux';

import "./App.scss";
// import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css"


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
        {/* <Button
          disabled = {this.}
        >Hey</Button> */}
        <Provider store={store}>
          <Header />
          <Switch>
            <SecureRoute path={"/dashboard"} render={() => <DashBoard changeAuth={this.changeAuthorization} authtoken={this.state.isAuthed} />} />
            <Route path={"/register"} component={Registration} />
            <Route path={"/"} exact render={(routeProps) => <LandingPage {...routeProps} changeAuth={this.changeAuthorization} />} />
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
