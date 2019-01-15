import React, { Component } from "react";
import { TextField, Divider } from "react-md";
import "./css/RegistrationPage.css";
import axios from "axios";
import controller from '../controller';

// console.log(controller);

class Registration extends Component {

  state = {
    name: '',
    email: '',
    username: '',
    mobile: '',
    password: '',
  }

  handleInputChange = (value, event) => {
    this.setState({
      [event.target.id]: value
    })
  }

  registerUser = () => {
    console.log("starting the post call")
    const data = this.state;
    axios.post(controller.register, { data }).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className="main-content-container-div">
        <div className="registration-div md-grid">
          <h3>Registration</h3>
          <Divider style={{ background: "black" }} />
          <TextField
            id="name"
            inputStyle={{ border: "0", width: "100%" }}
            type="text"
            className="md-cell md-cell--bottom"
            style={{ padding: "0px" }}
            placeholder="Enter Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required={true}
          />
          
          <TextField
            id="email"
            inputStyle={{ border: "0", width: "100%" }}
            type="email"
            className="md-cell md-cell--bottom"
            style={{ padding: "0px" }}
            placeholder="Enter Email Address"
            value={this.state.email}
            onChange={this.handleInputChange}
            required={true}
          />
          <TextField
            id="mobile"
            inputStyle={{ border: "0", width: "100%" }}
            type="text"
            className="md-cell md-cell--bottom"
            style={{ padding: "0px" }}
            placeholder="Enter Mobile"
            value={this.state.mobile}
            onChange={this.handleInputChange}
            required={true}
          />
          <TextField
            id="username"
            inputStyle={{ border: "0", width: "100%" }}
            type="text"
            className="md-cell md-cell--bottom"
            style={{ padding: "0px" }}
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required={true}
          />
          <TextField
            id="password"
            inputStyle={{ border: "0", width: "100%" }}
            type="password"
            className="md-cell md-cell--bottom"
            style={{ padding: "0px" }}
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required={true}

          />

          <button onClick={this.registerUser} className="btn btn-primary registration-btn">Register</button>
        </div>
      </div>

    );
  }
}

export default Registration;
