import React, { Component } from "react";

class Login extends Component {
  state = {};

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form className='form-group'>
          <p className='m-2'>UserId</p>
          <input type='text' className='form-control' />
          <p className='m-2'>Password</p>
          <input type='password' className='form-control' />
        </form>
        <div>
          <button className='btn btn-primary'>Login</button>
          <button className='btn btn-primary m-2'>Register</button>
        </div>
      </div>
    );
  }
}

export default Login;
