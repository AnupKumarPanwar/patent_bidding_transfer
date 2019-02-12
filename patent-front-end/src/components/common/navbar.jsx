import React, { Component } from "react";
import "../css/Navbar.scss";
import { Toolbar } from "react-md";
import Nav from "./Nav";

class Header extends Component {
  render() {
    return (
      <div className="toolbars__examples" style= {{boxShadow :"0px 0px 5px #888888"}}>
        <Toolbar
          children={<Nav />}
          title="Pider"
        />
      </div>
    );
  }
}

export default Header;
