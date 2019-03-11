import React, { Component } from "react";
import "../css/loginCss.scss";
import { TextField, Button, Divider, Snackbar } from "react-md";
import { MdRemoveRedEye, MdHome } from "react-icons/md";

import { connect } from "react-redux";
import { loginThunk } from "../../store/thunk/loginThunk";
import { resetAuthAfterToast } from "../../store/actions/login/LoginAction";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    modal_visible: false,
    autohide: true,
    toasts: [],
    loginButtonState: false
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

  verifyUser = async () => {
    console.log(this.props.auth);
    const { username, password } = this.state;
    this.setState({ loginButtonState: true });
    this.props.loginThunk({ username: username, password: password });
  };

  render() {
    if (this.props.auth) {
      this.props.history.push("/dashboard/profile");
      this.setState({ loginButtonState: false });
    } else if (this.props.auth === false) {
      console.log("Invalid");
      this.addToast("Invalid username / password");
      this.setState({ loginButtonState: false });
    }

    return (
      <div className="main-container">
        <div className="login-div ">
          <div className="d-flex ">
            <div>
              <div className="d-flex">
                <img
                  className="mr-2"
                  style={{ height: 30, width: 30 }}
                  src="/assets/logo.png"
                />
                <h3>Pider</h3>
              </div>

              <h4>Login</h4>
            </div>
            <div
              style={{ width: "100vw" }}
              className="d-flex  align-items-start justify-content-end"
            >
              <Link to="/">
                <MdHome className="home-button" />
              </Link>
            </div>
          </div>
          <Divider style={{ background: "black" }} />

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
          </div>
          <div className=" m-3 d-flex justify-content-center">
            <Button
              secondary
              raised
              className="m-2 p-2"
              disabled={this.state.loginButtonState}
              onClick={this.verifyUser}
            >
              Login
            </Button>

            <Link to="register">
              <Button primary flat className="m-2 p-2">
                Register
              </Button>
            </Link>
          </div>
          <Snackbar
            id="example-snackbar"
            toasts={this.state.toasts}
            autohide={true}
            onDismiss={this.dismissToast}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.login.auth
  };
};

const mapDispatchToProps = {
  loginThunk,
  resetAuthAfterToast
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
