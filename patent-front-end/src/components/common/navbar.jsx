import React, { Component } from "react";

import "../css/Navbar.scss";
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/lib/';
// import { Link } from "react-router-dom";
import { Toolbar } from 'react-md';



import Nav from './Nav';

class Header extends Component {
  render() {
    return (
      <div className="toolbars__examples">
        <Toolbar
          children={<Nav />}
          title="Pider"
        />
      </div>
    );
  }
}

export default Header;
