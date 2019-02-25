import React, { Component } from 'react';
import { Card, CardTitle, DataTable } from 'react-md';
import ActiveAuctionTable from "./auctionCommon/activeAuctionTable";
import ActiveAuctionDetails from "./auctionCommon/activeAuctionDetails";
import { activeAuctionThunk } from "../../store/thunk/auctionThunk";


import { connect } from "react-redux";
import { stat } from 'fs';


class ActiveAuction extends Component {

  componentWillMount() {
    this.props.activeAuctionThunk(
      this.props.userInfo
    );
  }

  render() {
    return (
      <div style={{ display: "fixed", height: "90vh", top: "0" }}>
        <div className="md-grid">
          <div className="md-cell md-cell--3">
            <ActiveAuctionTable />
          </div>
          <div className="md-cell md-cell--9">
            <ActiveAuctionDetails />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo : state.login.userInfo,
    auctions: state.auction.auctions
  }
}

const mapDispatchToProps = {
  activeAuctionThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAuction);