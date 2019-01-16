import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

const NavItemLink = ({ label, to, icon, exact }) => (
    <Route path={to} exact={exact}>
        {({ match }) => {

            return (
                <ListItem
                    component={Link}
                    active={!!match}
                    to={to}
                    primaryText={label}
                />
            )
        }}
    </Route>
);

NavItemLink.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    exact: PropTypes.bool,
    icon: PropTypes.node,
}

export default NavItemLink;