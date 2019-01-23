import React, { Component } from "react";
import "./css/loginCss.scss";

import { TextField, Button, Divider, Snackbar } from 'react-md';
import { MdRemoveRedEye } from 'react-icons/md';
import DashBoard from './dashboard';
import service from '../services/userService';

class Login extends Component {
  state = {
    username: '',
    password: '',
    modal_visible: false,
    toasts: [],
    autohide: true
  };

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };


  handleInputChange = (value, event) => {
    this.setState({
      [event.target.id]: value
    })
  }

  verifyUser = () => {
    const data = this.state;
    const props = this.props;
    service.login(data).then((response) => {
      console.log(response);
      if (response) {
        props.changeAuth(true);
        props.routes.push("/dashboard");
      } else {
        this.addToast('Incorrect username/password');
      }
    });

  }

  render() {

    return (
      <div className="div-login container">
        <h3>Login</h3>
        <Divider />
        <div className=" md-grid">
          <TextField
            id="username"
            type="text"
            className="md-cell md-cell--12"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <TextField
            id="password"
            type="password"
            className="md-cell md-cell--12"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            passwordIcon={<MdRemoveRedEye />}
          />

          <div className="login-button">
            <Button
              raised
              primary
              onClick={this.verifyUser}
              className="md-cell md-cell--6"
            >

              Login
            </Button>

            <Button
              raised
              primary
              onClick={this.verifyUser}
              className="md-cell md-cell--6"
            >

              Register
            </Button>
          </div>


        </div>
        <Snackbar
          id="example-snackbar"
          toasts={this.state.toasts}
          autohide={true}
          onDismiss={this.dismissToast}
        />
      </div >
    );
  }
}

export default Login;
