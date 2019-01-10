import React, { Component } from "react";
import "./css/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="" className="navbar-brand">
          <b>Pider</b>
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item active">
            <a href="" className="nav-link">
              Bid
            </a>
          </li>
          <li className="nav-item active">
            <a href="" className="nav-link">
              Transfer
            </a>
          </li>
          <li className="nav-item active">
            <a href="" className="nav-link">
              About Us
            </a>
          </li>
          <li className="nav-item active">
            <a href="" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
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
        <button class="btn btn-primary m-2">login</button>
      </nav>
    );
  }
}

export default Navbar;
