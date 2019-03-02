import React, { Component } from "react";
import "../css/Navbar.scss";
import { Toolbar } from "react-md";
import Nav from "./Nav";

class Header extends Component {
  render() {
    return (
        <Nav/>
    );
  }
}

export default Header;
