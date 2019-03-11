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
      <div className="landing-container md-grid">
        <div className="md-cell md-cell--12 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <span
              className="h1 mt-1"
              style={{ fontWeight: "bolder", color: "white" }}
            >
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
              className="mt-2"
              style={{ width: "70vw", height: "1", background: "white" }}
            />
          </div>
        </div>

        <div className="md-cell md-cell--12 main-content">
          <div className="d-flex flex-column align-items-center p-3">
            <h2 className="">Patent Solutions</h2>

            <p className="para">
              A platform to securely manage your intellectual property with
              blockchain based technology. We take you to a journey from
              successfully registering your ideas ; to successfully getting the
              right value for your ideas. Right now we manage the rhythms close
              to your hearts (Audios) and your creative visual thoughts ( Images
              ). So go ahead and register yourself and get the right value for
              your product.
            </p>
          </div>

          <div className="d-flex  goals justify-content-center">
            <div className="md-grid">
              <button
                className="m-4 md-cell md-cell--4 border border-primary bg-white"
                disabled
              >
                <span className="text-dark">AUCTION</span>
              </button>
              <button
                className="m-4 md-cell md-cell--4 border border-primary bg-white "
                disabled
              >
                <span className="text-dark">BID</span>
              </button>
              <button
                className="m-4 md-cell md-cell--4 border  border-primary bg-white  "
                disabled
              >
                <span className="text-dark">TRANSFER</span>
              </button>
            </div>
          </div>

          <div className="md-grid mt-3 ">
            <div className="d-flex  justify-content-end p-2 pr-5 md-cell md-cell--6">
              <div className="d-flex flex-column align-items-center">
                <span className="above_button_text">
                  Found our idea interesting ? <br /> Register by Clicking on
                  the Registration Button Below
                </span>

                <Link to="/register">
                  <Button className="mt-3" raised secondary>
                    Register
                  </Button>
                </Link>
              </div>
            </div>
            <div className="d-flex  justify-content-center md-cell md-cell--6">
              <div className="d-flex flex-column align-items-center">
                <div className="m-3">
                  <span className="above_button_text">
                    Existing User ?<br />
                    Login
                  </span>
                </div>

                <div>
                  <Link to="/login">
                    <Button raised secondary>
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
