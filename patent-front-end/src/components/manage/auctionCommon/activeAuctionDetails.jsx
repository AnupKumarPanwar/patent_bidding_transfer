import React from "react";
import { DataTable, Divider, TableRow, TableColumn } from "react-md";
import { connect } from "react-redux";
import Timer from "../../common/Timer";
import { userInfo } from "os";

const ActiveAuctionDetails = props => {
  return (
    <div style={{ display: "fixed", height: "85vh" }}>
      <div className="d-flex justify-content-between m-4">
        <h3>
          <b>Auction details</b>
        </h3>
        {props.auctions.length > 0 ? (
          <div>
            <Timer
              seconds={props.auctions[props.auctionSelectedIndex].endDate}
              auctionId={props.auctions[props.auctionSelectedIndex].auctionId}
              patentId={props.auctions[props.auctionSelectedIndex].patentId}
              sender={props.userInfo.publicAddress}
            />
          </div>
        ) : (
          <div />
        )}
      </div>

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
            {props.auctions.length > 0 ? (
              Object.keys(props.auctions[props.auctionSelectedIndex]).map(
                key => (
                  <TableRow>
                    <TableColumn>
                      <b>{key}</b>
                    </TableColumn>
                    <TableColumn plain adjusted={false}>
                      {key === "endDate"
                        ? new Date(
                            parseInt(
                              props.auctions[props.auctionSelectedIndex][key]
                            )
                          ).toLocaleString()
                        : props.auctions[props.auctionSelectedIndex][key]}
                    </TableColumn>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableColumn>
                  <h3 className="m-2" style={{ color: "red" }}>
                    No Details Available
                  </h3>
                </TableColumn>
              </TableRow>
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auctions: state.auction.auctions,
    auctionSelectedIndex: state.auction.auctionSelectedIndex,
    userInfo : state.login.userInfo
  };
};

export default connect(mapStateToProps)(ActiveAuctionDetails);
