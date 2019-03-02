import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/Nav.scss";
import { Divider } from "react-md";

const Nav = ({ className }) => (
  <div className="md-cell md-cell--12" style={{margin:0,width:"100%", backgroundColor: "#282828" }}>
    <div className="pt-2  d-flex justify-content-center">
      <div className="d-flex align-items-center">
        <span className="h1 mt-2" style={{color:"white"}}>Pider</span>
      </div>
    </div>
  </div>
);

Nav.propTypes = {
  className: PropTypes.string
};

export default Nav;
