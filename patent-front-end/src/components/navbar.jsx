import React, { Component } from "react";
import "./css/Navbar.css";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home">
          <p className="navbar-brand">
            <b>Pider</b>
          </p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/home">
                <p href="#" className="nav-link">
                  Home
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register">
                <p href="#" className="nav-link">
                  Register
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <p href="#" className="nav-link">
                Transfer
              </p>
            </li>
            <li className="nav-item">
              <p href="#" className="nav-link">
                About Us
              </p>
            </li>
            <li className="nav-item">
              <p href="" className="nav-link">
                Contact
              </p>
            </li>
          </ul>
        </div>

        <form action="" className="form-search form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <button className="btn btn-primary m-2">login</button>
      </nav>
    );
  }
}

export default Navbar;
