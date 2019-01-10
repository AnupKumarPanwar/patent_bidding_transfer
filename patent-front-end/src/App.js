import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Registration from "./components/registrationPage";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="RegistrationForm">
          <Registration />
        </div>
      </div>
    );
  }
}

export default App;
