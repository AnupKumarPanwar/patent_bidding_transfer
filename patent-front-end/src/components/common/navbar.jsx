import React, { Component } from "react";
import "../css/Navbar.scss";
import { Toolbar } from "react-md";
import Nav from "./Nav";

// TODO class name should be same as file name
// TODO also this file is almost redundant. Remove if possible and directly call Nav where required.
class Header extends Component {
  render() {
    return (
        <Nav/>
    );
  }
}

export default Header;
