import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "../css/Nav.scss";

const Nav = ({ className }) =>

    <div className="className nav_elements">


        <Link to="/" className="nav-link">
            Home
        </Link>


        <Link to="/register" className="nav-link">
            Register
        </Link>


        <Link to="/" className="nav-link">
            Transfer
        </Link>

        <Link to="/" className="nav-link">
            About Us
        </Link>

        <Link to="/" className="nav-link">
            Contact
        </Link>

    </div>
    ;

Nav.propTypes = {
    className: PropTypes.string,
};

export default Nav;