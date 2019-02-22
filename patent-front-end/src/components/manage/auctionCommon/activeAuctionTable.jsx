import React, { Component } from 'react';
import { Card, CardTitle, DataTable, Divider, TableRow, TableColumn, TableBody } from 'react-md';
import { connect } from "react-redux";
import { changeAuctionDetails } from "../../../store/actions/auction/ActiveAuctionActions";

const ActiveAuctionTable = (props) => {

  return (
    <Card style={{ display: "fixed", height: "85vh" }}>
      <CardTitle>
        <h3>
          Auctions
        </h3>
      </CardTitle>
      <Divider />

      <DataTable
        style={{
          height: "60vh",
          overflowY: "auto"
        }}
        plain={true}
      >

        <TableBody>
          {
            props.auctions.length > 0 ?
              props.auctions.map((auction, index) => (
                <TableRow>
                  <TableColumn
                    onClick={
                      () => {
                        props.changeAuctionDetails(index)
                      }
                    }
                  >
                    {auction.patentName}
                  </TableColumn>
                </TableRow>
              ))
              : <TableRow>
                <TableColumn>
                  <h3 style={{ color: "red" }}>
                    No Active Auctions
                    </h3>
                </TableColumn>
              </TableRow>
          }

        </TableBody>
      </DataTable>



    </Card>

  );
}

const mapStateToProps = (state) => {
  return {
    auctions: state.auction.auctions,
    auctionSelectedIndex: state.auction.auctionSelectedIndex
  }
}

const mapDispatchToProps = {
  changeAuctionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAuctionTable);