import React, { Component } from "react";

import IpList from "./ipList";
import IpDetails from "./ipDetails"

class BiddingPage extends Component {

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

export default BiddingPage;
