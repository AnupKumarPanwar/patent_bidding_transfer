import React, { Component } from 'react';
import { NavigationDrawer, Button, Drawer, Toolbar, ListItem } from 'react-md';
import { MdMenu } from 'react-icons/md';
import CSSTransitionGroup from 'react-transition-group/CSSTransition';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';

import PatentBid from "./patentBid";
import ManagePatents from "./managePatents";
import AuctionPage from "./manage/auctionPage";
import PatentPage from "./patentPage";
import HomePatent from './homePatent';
import NavLinkItem from "./navItemLink";
import { PropTypes } from 'prop-types';

import "./css/dashboard.scss";

const TO_PREFIX = "/dashboard";

const navItems = [{
    label: "Home",
    to: TO_PREFIX,
    exact: true,
}, {
    label: "Bid for Patents",
    to: `${TO_PREFIX}/bid`,
    exact: true
}, {
    label: "Manage Patents",
    to: `${TO_PREFIX}/patents`,
    exact: true,
}, {
    label: "Active Auction",
    to: `${TO_PREFIX}/auction`,
    exact: true,
}];


class DashBoard extends Component {

    state = {
        visible: false
    };

    componentDidMount() {
        console.log("Component Did Mount")
        this.dialog = document.getElementById('drawer-routering-example-dialog');
    }

    componentWillMount() {
        console.log("Component Will Mount")
    }

    componentWillReceiveProps() {
        console.log("Component Will Receive Props")
    }

    componentWillUnmount() {
        console.log("component unmounting");
        this.props.changeAuth(false);
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };

    hideDrawer = () => {
        this.setState({ visible: false });
    };

    handleVisibility = (visible) => {
        this.setState({ visible });
    }

    render() {

        const { visible } = this.state;

        // if (this.props.authtoken) {
            if (1) {
            return (
                <div className="dashboard">
                    <Toolbar
                        colored
                        fixed
                        title="Pider"
                        nav={
                            <Button icon onClick={this.showDrawer}><MdMenu></MdMenu></Button>
                        }
                    />

                    <CSSTransitionGroup
                        component="div"
                        transitionName="md-cross-face"
                        transitionEnterTimeout={300}
                        transitionLeave={false}
                        className='md-toolbar-relative md-grid'
                    >

                        <Switch>

                            <Route path={navItems[0].to} exact component={HomePatent} />
                            <Route path={navItems[1].to} component={PatentBid} />
                            <Route path={navItems[2].to} component={ManagePatents} />
                            <Route path={navItems[3].to} component={AuctionPage} />
                            {/* Route of a particular patent */}
                            <Route path={`${TO_PREFIX}/patent/:id`} component={PatentPage} />

                        </Switch>

                    </CSSTransitionGroup>

                    <Drawer
                        type={Drawer.DrawerTypes.TEMPORARY}
                        visible={visible}
                        onVisibilityChange={this.handleVisibility}
                        header={<Toolbar
                            title="Pider"
                        />}
                        renderNode={this.dialog}
                        navItems={
                            navItems.map(props => <NavLinkItem {...props} key={props.to} />)
                        }
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Not Authorized !</h1>
                </div>
            );


        }
    }
}

export default DashBoard;