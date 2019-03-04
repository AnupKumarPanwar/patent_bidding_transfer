import React, { Component } from "react";
import { Button, Drawer, Toolbar } from "react-md";
import { MdMenu, MdPortrait, MdAccountCircle } from "react-icons/md";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import { Route, Switch } from "react-router-dom";

import { logoutAction } from "../../store/actions/login/LoginAction";
import { connect } from "react-redux";

import BiddingPage from "../bidding/biddingPage";
import ManagePatents from "../manage/managePatents";
import ActiveAuciton from "../manage/activeAuction";
import SearchPage from "../manage/searchPage";
import PatentPage from "../manage/patentPage";
import HomePatent from "./homePatent";
import ProfilePage from "../manage/profilePage";
import NavLinkItem from "../common/navItemLink";

import "../css/dashboard.scss";

const TO_PREFIX = "/dashboard";

// TODO define in constants file.
const navItems = [
  {
    label: "Profile",
    to: `${TO_PREFIX}/profile`,
    exact: false
  },
  {
    label: "Register Patent",
    to: TO_PREFIX,
    exact: true
  },
  {
    label: "Bid for Patents",
    to: `${TO_PREFIX}/bid`,
    exact: true
  },
  {
    label: "Manage Patents",
    to: `${TO_PREFIX}/patents`,
    exact: true
  },
  {
    label: "Active Auction",
    to: `${TO_PREFIX}/auction`,
    exact: true
  },
  {
    label: "Search",
    to: `${TO_PREFIX}/search`,
    exact: true
  },
  {
    label: "Logout",
    to: `/`,
    exact: true
  }
];

class DashBoard extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    this.dialog = document.getElementById("drawer-routering-example-dialog");
  }

  componentWillUnmount() {
    this.props.logout();
    this.props.history.push("/");
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  hideDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = visible => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;

    if (this.props.auth) {
      return (
        <div className="dashboard">
          <Toolbar
            colored
            fixed
            themed={true}
            nav={
              <div
                className="d-flex m-1"
                style={{ width: "100vw", fontSize: "1.5em" }}
              >
                <MdMenu
                  className="align-self-center m-3"
                  onClick={this.showDrawer}
                />
                <div className="font-weight-bold align-self-center">Pider</div>
                <div
                  className="d-flex justify-content-end align-self-center"
                  style={{ width: "90vw" }}
                >
                  <div style={{fontSize:"0.75em"}}>
                    {this.props.user.name}{" "}
                    <MdAccountCircle
                      className="m-2"
                      style={{ fontSize: "1.5em" }}
                    />
                  </div>
                  {/* <Md */}
                </div>
              </div>
            }
          />

          <CSSTransitionGroup
            component="div"
            transitionName="md-cross-face"
            transitionEnterTimeout={300}
            transitionLeave={false}
            className="md-toolbar-relative md-grid"
          >
            <Switch>
              <Route
                path={navItems[0].to + "/:username?"}
                exact
                component={ProfilePage}
              />
              {/* // TODO can a loop be defined for this? */}
              <Route path={navItems[1].to} exact render={()=><HomePatent/>} />
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
            header={<Toolbar title="Pider" />}
            renderNode={this.dialog}
            navItems={navItems.map(props => (
              <NavLinkItem {...props} key={props.to} />
            ))}
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

const mapStateToProps = state => {
  return {
    auth: state.login.auth,
    user: state.login.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
