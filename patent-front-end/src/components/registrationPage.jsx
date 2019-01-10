import React, { Component } from "react";
import "./css/RegistrationPage.css";
class Registration extends Component {
  // state = {  }
  render() {
    return (
      <div>
        <h3>Register</h3>
        <hr />
        <form className="form form-group registrationForm">
          <p className="m-2">Enter Name</p>
          <input type="text" className="form-control" />
          <p className="m-2">Enter E-mail address </p>
          <input type="text" className="form-control" />
          <p className="m-2">Enter Mobile</p>
          <input type="text" className="form-control" />
          <p className="m-2">Enter Username</p>
          <input type="text" className="form-control" />
        </form>
        <button className="btn btn-primary register-btn">Register</button>
      </div>
    );
  }
}

export default Registration;
