import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "../css/Nav.scss";

const Nav = ({ className }) =>

    <div className="className nav_elements">


        <Link to="/">
            <a className="nav-link">
                Home
                </a>
        </Link>


        <Link to="/register">
            <a className="nav-link">
                Register
                </a>
        </Link>


        <a className="nav-link">
            Transfer
    </a>


        <a className="nav-link">
            About Us
    </a>


        <a href="" className="nav-link">
            Contact
    </a>


    </div>
    ;

Nav.propTypes = {
    className: PropTypes.string,
};

export default Nav;