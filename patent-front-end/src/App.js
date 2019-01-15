import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

import Registration from "./components/registrationPage";
import LandingPage from "./components/landingPage";
import Header from "./components/navbar";
import { NavigationDrawer } from 'react-md';

class App extends Component {
  render() {
    return (
      <NavigationDrawer
        toolbarTitle="react-md with create-react-app v2"
        drawerTitle="react-app"
      >
        <div className="App">
          <header className="App-header">
            <img className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </NavigationDrawer>
      // <div className="App">
      //   <Header />
      //   <Switch>
      //     <Route path={"/register"} component={Registration} />
      //     <Route path={"/"} component={LandingPage} />
      //   </Switch>
      // </div>
    );
  }
}

export default App;
