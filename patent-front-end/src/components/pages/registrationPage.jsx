import React, { Component } from "react";
import {
  TextField,
  Divider,
  DialogContainer,
  Snackbar,
  Button,
  Paper
} from "react-md";
import "../css/RegistrationPage.scss";
import { MdRemoveRedEye, MdHome } from "react-icons/md";

import service from "../../services/userService";
import { loginAction } from "../../store/actions/login/LoginAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Registration extends Component {
  state = {
    name: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    nationality: "",
    address: "",
    visible: false,
    autohide: true,
    toasts: []
  };

  addToast = (text, action, autohide = true) => {
    this.setState(state => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
    console.log(this.state);
    this.props.resetAuthAfterToast();
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  handleInputChange = (value, event) => {
    this.setState({
      [event.target.id]: value
    });
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
    if (!this.props.auth) {
      this.props.history.push("/");
    }
  };

  registerUser = () => {
    const data = this.state;
    service.register(data).then(response => {
      if (response.success) {
        response.success = "";
        this.props.loginAction(response);
        this.show();
      } else {
        this.addToast(response.message);
      }
    });
  };

  render() {
    const { visible } = this.state;
    const actions = [
      {
        onClick: this.hide,
        primary: true,
        children: "Okay"
      }
    ];

    return (
      <Paper className="main-content-container-div">
        <DialogContainer
          id="speed-boost"
          visible={visible}
          title="Registration Successful"
          onHide={this.hide}
          aria-describedby="speed-boost-description"
          modal
          actions={actions}
        >
          <p id="speed-boost-description" className="md-color--secondary-text">
            You will be redirected to the Login Page.
          </p>
        </DialogContainer>

        <div className="registration-div">
          <div className="d-flex ">
            <h3>Registration</h3>

            <div
              style={{ width: "100vw" }}
              className="d-flex  align-items-start justify-content-end "
            >
              <a href="#">
                <MdHome className="home-button" />
              </a>
            </div>
          </div>

          <Divider style={{ background: "black" }} />
          <div className="md-grid">
            <TextField
              id="name"
              type="text"
              className="md-cell--12 m-2"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="email"
              type="email"
              className="md-cell--12 m-2"
              placeholder="Enter Email Address"
              value={this.state.email}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="mobile"
              type="text"
              className="md-cell--12 m-2"
              placeholder="Enter Mobile"
              value={this.state.mobile}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="address"
              type="text"
              className="md-cell--12 m-2"
              placeholder="Enter Address"
              value={this.state.address}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="nationality"
              type="text"
              className="md-cell--12 m-2"
              placeholder="Enter Nationality"
              value={this.state.nationality}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="username"
              type="text"
              className="md-cell--12 m-2"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required={true}
            />

            <TextField
              id="password"
              type="password"
              className="md-cell--12 m-2"
              style={{ padding: "0px" }}
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required={true}
              passwordIcon={<MdRemoveRedEye />}
            />
          </div>

          <div className="d-flex justify-content-center">
            <Button
              onClick={this.registerUser}
              secondary
              raised
              className="m-2"
            >
              Register
            </Button>
            <a href="#login">
              <Button primary flat className="m-2">
                Login ?
              </Button>
            </a>
          </div>
        </div>
        <Snackbar
          id="example-snackbar"
          toasts={this.state.toasts}
          autohide={true}
          onDismiss={this.dismissToast}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.login.auth
  };
};

const mapDispatchToProps = {
  loginAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
