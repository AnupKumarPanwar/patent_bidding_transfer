import React, { Component } from "react";
import "./css/loginCss.css";
class Login extends Component {
  state = {};

  render() {
    return (
      <div className='form-container'>
        <strong align='center'>
          <h2>Login</h2>
        </strong>
        <form className='form-wrapper'>
          <strong className='m-2'>UserId</strong>
          <input type='text' className='form-control' placeholder='Userid' />
          <strong className='m-2'>Password</strong>
          <input
            type='password'
            className='form-control'
            placeholder='password'
          />
        </form>
        <br />
        <div className='login-button'>
          <button className='btn btn-primary btn-block '>Login</button>

          {/* <button className='btn btn-primary m-2'>Register</button> */}
        </div>
      </div>
    );
  }
}

export default Login;
