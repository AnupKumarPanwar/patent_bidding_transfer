import React, { Component } from "react";
import "../css/landingPage.scss";
import Login from "./loginPage";
import Registration from "./registrationPage";
import { Button, Divider } from "react-md";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  // state = {};
  render() {
    return (
      <div className="border landing-container md-grid">
        <div className="md-cell md-cell--12 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <span className="h1 mt-2" style={{ color: "white" }}>
              Pider
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center ml-3">
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="/" className="nav-link">
                About Us
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <Divider
              className="m-2"
              style={{ width: "70vw", height: "1", background: "white" }}
            />
          </div>
        </div>

        <div className="md-cell md-cell--12 main-content">
          <div className="d-flex flex-column align-items-center p-4">
            <h2 className="">Patent Solutions</h2>

            <p className="para">

            {/* // TODO Define some description of your own */}

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus quia nostrum a minus, porro consequuntur voluptas
              deleniti aspernatur incidunt quam animi nihil esse ducimus itaque
              sed sit ea. Pariatur.
            </p>
          </div>

          <div className="d-flex  goals justify-content-center">
            <div className="md-grid">
              <button className="m-5 md-cell md-cell--4 border border-primary bg-white" disabled>
                <span className="text-dark">AUCTION</span>
              </button>
              <button className="m-5 md-cell md-cell--4 border border-primary bg-white " disabled>
                <span className="text-dark">BID</span>
              </button>
              <button className="m-5 md-cell md-cell--4 border  border-primary bg-white  " disabled>
                <span className="text-dark">TRANSFER</span>
              </button>
            </div>
          </div>

          <div className="d-flex md-grid">
            <div className="md-cell md-cell--6">
              <div className="d-flex flex-column align-items-center">
                <div className="m-3 ">
                  <span className="above_button_text">
                    Found our idea interesting ? <br /> Register by Clicking on
                    the Registration Button Below
                  </span>
                </div>

                <div>
                  <Link to="/register">
                    <Button floating secondary>
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md-cell md-cell--6">
              <div className="d-flex flex-column align-items-center">
                <div className="m-3">
                  <span className="above_button_text">
                    Existing User ?<br />
                    Login
                  </span>
                </div>

                <div>
                <Link to="/login">
                    <Button secondary floating>
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="md-cell md-cell--12">
          <a id="register">
            <Registration history={this.props.history} />
          </a>
        </div>
        <div className="md-cell md-cell--12">
          <a id="login">
            <Login
              changeAuth={this.props.changeAuth}
              routes={this.props.history}
            />
          </a>
        </div> */}
      </div>
    );
  }
}

export default LandingPage;
