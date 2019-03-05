import React, { Component } from "react";
import { connect } from "react-redux";

import IpList from "./ipList";
import IpDetails from "./ipDetails";

import { getAuctions } from "../../store/thunk/biddingThunk";

class BiddingPage extends Component {
  componentWillMount() {
    this.props.getAuctions(this.props.userInfo);
  }

  render() {
    return (
      <div
        className="md-grid"
        style={{
          height: "100vh",
          top: 0,
          bottom: 0
        }}
      >
        {this.props.auctions.length > 0 ? (
          <React.Fragment>
            <div className="md-cell md-cell--4">
              <IpList />
            </div>

            <div className="rounded md-cell md-cell--8 d-flex flex-column bg-dark p-3">
              <h2 className="text-white font-weight-bold ml-2">
                Details of the patent
              </h2>
              <IpDetails />
            </div>
          </React.Fragment>
        ) : (
          <h2
            style={{
              color: "red",
              width: "100%",
              textAlign: "center",
              paddingTop: "20%",
              fontWeight: "bold"
            }}
          >
            No Patents For Bidding
          </h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login.userInfo,
    auctions: state.bidding.auctions
  };
};

const mapDispatchToProps = {
  getAuctions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingPage);
