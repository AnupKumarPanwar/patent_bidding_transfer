import React, { Component } from "react";
import "./App.css";
import Login from "./components/loginPage";

class App extends Component {
  render() {
    return (
      <div className='App' >
        <div className='login-box' >
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
