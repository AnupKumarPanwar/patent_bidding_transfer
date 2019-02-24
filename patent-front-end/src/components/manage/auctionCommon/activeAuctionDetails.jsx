import React, { Component } from 'react';
import { Card, CardTitle, DataTable, Divider, TableRow, TableColumn, TableBody } from 'react-md';
import { connect } from "react-redux";

const ActiveAuctionDetails = (props) => {
  
  return (
    <div style={{ display: "fixed", height: "85vh" }}>
      <CardTitle>
          <h3>
            <b>Auction details</b>
          </h3>
      </CardTitle>
      <Divider />

      <div className="md-grid">
        <div className="md-cell--12">
          <DataTable
            style={{
              height: "60vh",
              overflowY: "auto"
            }}
            plain={true}
          >
            {
              props.auctions.length > 0

                ?

                Object.keys(props.auctions[props.auctionSelectedIndex]).map(key => (
                  <TableRow>
                    <TableColumn>
                      <b>{key}</b>
                    </TableColumn>
                    <TableColumn
                      plain
                      adjusted={false}
                    >
                      {props.auctions[props.auctionSelectedIndex][key]}
                    </TableColumn>
                  </TableRow>
                ))

                : <TableRow>
                  <TableColumn>
                    <h3 className="m-2" style={{ color: "red" }}>
                      No Details Available
                  </h3>
                  </TableColumn>
                </TableRow>
            }
          </DataTable>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auctions: state.auction.auctions,
    auctionSelectedIndex: state.auction.auctionSelectedIndex
  }
}


export default connect(mapStateToProps)(ActiveAuctionDetails);