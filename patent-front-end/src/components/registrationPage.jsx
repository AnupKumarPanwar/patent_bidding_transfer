import React, { Component } from "react";
import { TextField, Divider } from "react-md";
import "./css/RegistrationPage.scss";
import { MdRemoveRedEye } from 'react-icons/md';

import service from "../services/userService";
// impor
class Registration extends Component {

  state = {
    name: '',
    email: '',
    username: '',
    mobile: '',
    password: '',
    nationality: '',
    address: ''
  }

  handleInputChange = (value, event) => {
    this.setState({
      [event.target.id]: value
    })
  }

  registerUser = () => {
    console.log("starting the post call")
    const data = this.state;
    service.register(data).then(response => {
      console.log(response);
    })
  }

  render() {
    return (
      <div className="main-content-container-div">
        <div className="registration-div">
          <h3>Registration</h3>
          <Divider style={{ background: "black" }} />
          <div className="md-grid">
            <TextField
              id="name"
              type="text"
              className="md-cell"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="email"
              type="email"
              className="md-cell"
              placeholder="Enter Email Address"
              value={this.state.email}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="mobile"
              type="text"
              className="md-cell"
              placeholder="Enter Mobile"
              value={this.state.mobile}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="address"
              type="text"
              className="md-cell"
              placeholder="Enter Address"
              value={this.state.address}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="nationality"
              type="text"
              className="md-cell"
              placeholder="Enter Nationality"
              value={this.state.nationality}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="password"
              type="password"
              className="md-cell"
              style={{ padding: "0px" }}
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required={true}
              passwordIcon={<MdRemoveRedEye />}
            />
          </div>


          <button onClick={this.registerUser} className="btn btn-primary registration-btn">Register</button>
        </div>
      </div>

    );
  }
}

export default Registration;
