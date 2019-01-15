import React, { Component } from "react";

// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/lib/';
// import { Link } from "react-router-dom";
import { Toolbar } from 'react-md';
import { Link } from "react-router-dom";


import Nav from './common/Nav';
import KebabMenu from './common/KebabMenu';


class Header extends Component {
  render() {
    return (

      <div className="toolbars__examples">
        <Toolbar
          nav={<Nav />}
          title="Transparent"
          actions={<KebabMenu id="toolbar-transparent-kebab-menu" />}
        />
      </div>



    );
  }
}

export default Header;

// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <Link to="/home">
//     <a className="navbar-brand">
//       <b>Pider</b>
//     </a>
//   </Link>

//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav">
//       <li className="nav-item active">
//         <Link to="/home">
//           <a className="nav-link">
//             Home
//           </a>
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/register">
//           <a className="nav-link">
//             Register
//           </a>
//         </Link>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link">
//           Transfer
//         </a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link">
//           About Us
//         </a>
//       </li>
//       <li className="nav-item">
//         <a href="" className="nav-link">
//           Contact
//         </a>
//       </li>
//     </ul>
//   </div>
// </nav>


