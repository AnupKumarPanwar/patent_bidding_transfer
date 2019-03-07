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
import Joi from "joi";
// import

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

  // constructor() {
  //   super();
  //   this.schema = Joi.object().keys({
  //     username: Joi.string()
  //       .alphanum()
  //       .min(3)
  //       .max(30),
  //     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  //     email: Joi.string().email({ minDomainAtoms: 2 }),
  //     name: Joi.string()
  //       .alphanum()
  //       .min(3)
  //       .max(30),
  //     nationality: Joi.string().alphanum(),
  //     mobile: Joi.string().length(10)
  //   });
  // }

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
    // console.log(event.target.id);
    // let result;
    // switch (event.target.id) {
    //   case "name":
    //     const result = Joi.validate({  "name": value }, this.schema);
    //     break;
    //   case "email":
    //     const result = Joi.validate({ "email": value }, this.schema);
    //     break;
    //   case "nationality":
    //     const result = Joi.validate({ "nationality": value }, this.schema);
    //     break;
    //   case "password":
    //     const result = Joi.validate({"password": value }, this.schema);
    //     break;
    //   case "username":
    //     const result = Joi.validate({ "username": value }, this.schema);
    //     break;
    //   case "mobile":
    //     const result = Joi.validate({ "mobile": value }, this.schema);
    //     break;
    //   case "address":
    //     const result = Joi.validate({ "address": value }, this.schema);
    //     break;
    // }
    // // const key = event.target.id;
    // // const result = Joi.validate({ key: value }, this.schema);
    // console.log(result);
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
      if(response !== undefined){
        if (response.success) {
          response.success = "";
          this.props.loginAction(response);
          this.show();
        } else {
          this.addToast(response.message);
        }
      }else{
        alert("No response from the server");
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
              <Link to="/">
                <MdHome className="home-button" />
              </Link>
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
            <Link to="login">
              <Button primary flat className="m-2">
                Login ?
              </Button>
            </Link>
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
