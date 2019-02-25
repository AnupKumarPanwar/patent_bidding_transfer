import React, { Component } from "react";
import {connect} from "react-redux";

import IpList from "./ipList";
import IpDetails from "./ipDetails"

import {getAuctions} from "../../store/thunk/biddingThunk";

class BiddingPage extends Component {

  componentWillMount(){
    this.props.getAuctions()
  }

  render() {
    return (


      <div
        className="md-grid"
        style={{
          height: "90vh",
          top:0,
          bottom:0
        }}
      >


        <div className="md-cell md-cell--4">
          <IpList />
        </div>

        <div className="md-cell md-cell--8">
          <IpDetails />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    auctions : state.bidding.auctions
  }
}

const mapDispatchToProps = {
  getAuctions
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingPage);
