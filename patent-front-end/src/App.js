import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./components/registrationPage";

import LandingPage from "./components/landingPage";
import MainContent from "./components/mainContent";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path={"/home"} component={LandingPage} />
          <Route path={"/register"} component={Registration} />         
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
