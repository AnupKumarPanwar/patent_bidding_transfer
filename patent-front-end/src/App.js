import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Registration from "./components/registrationPage";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path={"/register"} component={Registration} />
          <Route path={"/"} component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
