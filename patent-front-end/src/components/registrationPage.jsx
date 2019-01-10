import React, { Component } from "react";
import { TextField, Divider } from "react-md";
import "./css/RegistrationPage.css";

class Registration extends Component {
  // state = {  }
  render() {
    return (
      <div className="main-content-container-div">
  <div className="registration-div md-grid">
        <h3>Registration</h3>
        <Divider style={{ background: "black" }} />
        <TextField
          id="placeholder-only-title"
          inputStyle={{ border: "0", width: "100%" }}
          type="text"
          className="md-cell md-cell--bottom"
          style={{ padding: "0px" }}
          placeholder="Enter Name"
        />
        <TextField
          id="placeholder-only-title"
          inputStyle={{ border: "0", width: "100%" }}
          type="email"
          className="md-cell md-cell--bottom"
          style={{ padding: "0px" }}
          placeholder="Enter Email Address"
        />
        <TextField
          id="placeholder-only-title"
          inputStyle={{ border: "0", width: "100%" }}
          type="text"
          className="md-cell md-cell--bottom"
          style={{ padding: "0px" }}
          placeholder="Enter Mobile"
        />
        <TextField
          id="placeholder-only-title"
          inputStyle={{ border: "0", width: "100%" }}
          type="text"
          className="md-cell md-cell--bottom"
          style={{ padding: "0px" }}
          placeholder="Enter Username"
        />

        <button className="btn btn-primary registration-btn">Register</button>
      </div>
        </div>
    
    );
  }
}

export default Registration;
