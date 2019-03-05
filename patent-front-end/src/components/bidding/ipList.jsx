import React from "react";
import { Paper } from "react-md";
import { connect } from "react-redux";
import {
  changeAuctionDetails,
  changeBidFormState
} from "../../store/actions/bidding/BiddingActions";
import { ipAddress } from "../../controller";

const AuctionsList = props => {
  return (
    <div
      className="ml-3"
      style={{
        height: "85vh",
        width: "30%",
        overflowY: "auto",
        position: "fixed",
        zIndex: 1,
        left: 0
      }}
    >
      {props.auctions.map((auction, index) => (
        <Paper className="border border-2 md-cell md-cell--12 md-grid bg-white">
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              overflowX: "hidden"
            }}
            // TODO define a function for this, don't call two functions in lambda expression.
            onClick={() => {
              props.changeAuctionDetails(index);
              props.changeBidFormState(
                true,
                props.bidFormState ? null : props.bidAmount
              );
            }}
          >
            <section className="md-cell md-cell--4">
              {props.auctions.length > 0 ? (
                <div>
                  {props.auctions[index]["patentType"] === "Image" ? (
                    <img
                      className="responsive"
                      src={
                        ipAddress +
                        "/static/Image/" +
                        props.auctions[index]["uploadFileName"]
                      }
                      style={{ height: 100, width: 100, borderRadius: "50%" }}
                      alt="Something from unsplash it"
                    />
                  ) : (
                    <img
                      className="responsive"
                      src="../assets/music.png"
                      style={{ height: 100, width: 100 }}
                      alt="Something from unsplash it"
                    />
                  )}
                </div>
              ) : (
                <React.Fragment />
              )}
            </section>
            <section className="md-cell md-cell--8">
              <ul
                style={{
                  color: "black",
                  listStyle: "none"
                }}
              >
                <li>{auction.patentName}</li>
                <li>{auction.patentType}</li>
                <li>{auction.patentSubType}</li>
              </ul>
            </section>
          </div>
        </Paper>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auctions: state.bidding.auctions,
    auctionSelectedIndex: state.bidding.auctionSelectedIndex,
    bidAmount: state.bidding.bidAmount,
    bidFormState: state.bidding.bidFormState
  };
};

const mapDispatchToProps = {
  changeAuctionDetails,
  changeBidFormState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionsList);
