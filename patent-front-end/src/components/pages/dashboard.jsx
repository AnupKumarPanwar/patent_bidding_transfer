import React, { Component } from 'react';
import { Button, Drawer, Toolbar } from 'react-md';
import { MdMenu } from 'react-icons/md';
import CSSTransitionGroup from 'react-transition-group/CSSTransition';
import { Route, Switch } from 'react-router-dom';

import { logoutAction } from "../../store/actions/login/LoginAction";
import { connect } from "react-redux";

import BiddingPage from "../bidding/biddingPage";
import ManagePatents from "../manage/managePatents";
import ActiveAuciton from '../manage/activeAuction';
import SearchPage from "../manage/searchPage";
import PatentPage from "../manage/patentPage";
import HomePatent from './homePatent';
import ProfilePage from '../manage/profilePage';
import NavLinkItem from "../common/navItemLink";

import "../css/dashboard.scss";

const TO_PREFIX = "/dashboard";

const navItems = [{
    label: "Profile",
    to: `${TO_PREFIX}/profile`,
    exact: true,
}, {
    label: "Register Patent",
    to: TO_PREFIX,
    exact: true,
},{
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
}, {
    label: "Search",
    to: `${TO_PREFIX}/search`,
    exact: true,
}];

class DashBoard extends Component {

    state = {
        visible: false
    };

    componentDidMount() {
        this.dialog = document.getElementById('drawer-routering-example-dialog');
    }

    componentWillUnmount() {
        // this.props.logout();
        // this.props.history.push("/")
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

        // if (this.props.auth) {
        if (1) {
            return (
                <div className="dashboard">

                    <Toolbar
                        colored
                        fixed
                        title={"Pider, Welcome " + this.props.user.name}
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

                            <Route path={navItems[0].to} exact component={ProfilePage} />
                            <Route path={navItems[1].to} exact component={HomePatent} />
                            <Route path={navItems[2].to} component={BiddingPage} />
                            <Route path={navItems[3].to} component={ManagePatents} />
                            <Route path={navItems[4].to} render={() => <ActiveAuciton />} />
                            <Route path={navItems[5].to} component={SearchPage} />

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
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.login.auth,
        user: state.login.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return ({
        logout: () => {
            dispatch(logoutAction());
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);