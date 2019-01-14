import React, { Component } from "react";
import "./css/landingPage.css";
import Login from "./loginPage";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div className="landing-home">
        <div id="introducton" className="row introduction">
          <div className="introduction-div col-sm-6">
            <h1>hahaha</h1>
            <p className="introduction-para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              temporibus aspernatur debitis ducimus earum doloremque minus
              sapiente tempore velit, quo in adipisci iste laboriosam saepe odio
              esse aperiam atque nihil?
            </p>
          </div>

          <div className="login-div col-sm-6">
            <Login className="haha" />
          </div>
        </div>

        <div id="features" className="features">
          <h1>aslkdfjaskdf</h1>
        </div>
      </div>
    );
  }
}

export default LandingPage;
