import React, { Component } from 'react';
import { Card, CardTitle, DataTable } from 'react-md';
import ActiveAuctionTable from "./auctionCommon/activeAuctionTable";
import ActiveAuctionDetails from "./auctionCommon/activeAuctionDetails";
import {activeAuctionThunk} from "../../store/thunk/auctionThunk";


import {connect} from "react-redux";


class ActiveAuction extends Component {

  componentDidMount() {
    // Here we will make a API call to the server to get the 
    // Users Active Auctions
    // the thunk will update the active auction
    this.props.activeAuctionThunk();
  }

  render() {
    return (
      <div style={{display:"fixed",height:"90vh", top:"0"}}>
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
    auctions : state.auction.auctions
  }
}

const mapDispatchToProps = {
  activeAuctionThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAuction);