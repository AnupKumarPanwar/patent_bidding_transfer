import React, { Component } from "react";
import "../css/landingPage.scss";
import Login from "./loginPage";

class LandingPage extends Component {
  // state = {};
  render() {
    return (
      <div className="landing-home">
        <div id="introducton" className="introduction md-grid">
          <div className="intro-div md-cell md-cell--8">
            <h1>Patent Solutions</h1>
            <p className="introduction-para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              temporibus aspernatur debitis ducimus earum doloremque minus
              sapiente tempore velit, quo in adipisci iste laboriosam saepe odio
              esse aperiam atque nihil?
            </p>
          </div>

          <div className="intro-div md-cell md-cell--4">
            <Login changeAuth = {this.props.changeAuth} routes={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
