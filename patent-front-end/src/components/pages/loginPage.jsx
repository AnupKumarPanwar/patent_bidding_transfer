import React, { Component } from "react";
import "../css/loginCss.scss";
import { TextField, Button, Divider, Snackbar } from 'react-md';
import { MdRemoveRedEye } from 'react-icons/md';

import { connect } from 'react-redux';
import { loginThunk } from "../../store/thunk/loginThunk";

class Login extends Component {
  state = {
    username: '',
    password: '',
    modal_visible: false,
    autohide: true
  };

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    })
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
    const { username, password } = this.state;
    this.props.loginThunk({ username: username, password: password });
  }

  render() {

    if (this.props.auth) {
      this.props.routes.push("/dashboard");
    }

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

const mapStateToProps = (state) => {
  return {
    auth: state.login.auth
  };
};

const mapDispatchToProps = {
  loginThunk
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);