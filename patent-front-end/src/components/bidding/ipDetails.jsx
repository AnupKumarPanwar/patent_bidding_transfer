import React from "react";
import { Paper, Divider, TextField } from "react-md";
import { DataTable, TableRow, TableColumn, Button } from "react-md";
import CustomModal from "../common/CustomModal";
import { changeModal } from "../../store/actions/modal/ModalActions";
import { connect } from "react-redux";
import {
  changeBidAmount,
  changeBidFormState
} from "../../store/actions/bidding/BiddingActions";
import { submitBid } from "../../store/thunk/biddingThunk";
import { ipAddress } from "../../controller";

const IpDetails = props => {
  // TODO remove unused variables.
  const audioThumbStyle = { width: "250", height: 250 };
  const audioStyle = { width: "100%" };
  const onSubmitBid = () => {
    console.log(props.bidAmount);
    console.log(props.auctions[props.auctionSelectedIndex]["minBid"]);
    if (
      props.bidAmount <= props.auctions[props.auctionSelectedIndex]["minBid"]
    ) {
      props.changeModal(true, 'Error', "Your Bid is less than the minimum Bid !");
    } else {
      if (
        props.auctions[props.auctionSelectedIndex]["endDate"] <
        new Date().getTime()
      ) {
        props.changeModal(true, 'Error', "Sorry You cant Bid for this patent Now !");
      } else {
        props.submitBid({
          publicAddress: props.userInfo.publicAddress,
          auctionId: props.auctions[props.auctionSelectedIndex].auctionId,
          bidAmount: props.bidAmount
        });
      }
    }
  };

  return (
    <Paper
      className="md-grid bg-white rounded"
      style={{
        height: "100%"
      }}
    >

      <section
        id="IpContainerText"
        className="    md-cell md-cell--6  d-flex flex-column"
      >
        {props.auctions.length > 0 ? (
          <React.Fragment>
            <CustomModal visible={props.showModal} />
            {/* TODO no inline styling, change in other files too. */}
            <DataTable plain={true} style={{ width: "100%" }}>
              {Object.keys(props.auctions[props.auctionSelectedIndex]).map(
                key => (
                  <TableRow>
                    <TableColumn>
                      <b>{key} : </b>
                    </TableColumn>
                    <TableColumn style={{ wordBreak: "break-all" }}>
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
              )}
            </DataTable>

            <Divider className="m-2" />

            <Button
              primary={!props.bidFormState}
              raised
              className="m-4"
              style={{
                alignSelf: "center"
              }}
              onClick={() => {
                props.changeBidFormState(
                  props.bidFormState,
                  props.bidFormState ? null : props.bidAmount
                );
              }}
            >
              {props.bidFormState ? "Cancel" : "Bid"}
            </Button>
          </React.Fragment>
        ) : (
            <TableRow>
              <TableColumn>
                <h3 className="m-2" style={{ color: "red" }}>
                  No Active Auctions
              </h3>
              </TableColumn>
            </TableRow>
          )}

        {props.bidFormState ? (
          <div>
            <TextField
              id="bid"
              placeholder="Your Bid"
              value={props.bidAmount}
              type="number"
              onChange={(v, e) => {
                props.changeBidAmount(v);
              }}
            />
            <div className="d-flex justify-content-center">
              <Button
                // TODO give better CSS class names
                className="m-2 p-2"
                primary
                raised
                onClick={() => onSubmitBid()}
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
            <React.Fragment />
          )}
      </section>

      <section id="IpContainerImage" className="border-left md-cell md-cell--6">
        <section
          // TODO define a class
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {props.auctions.length > 0 ? (
            // TODO remove unwanted comments
            // console.log(props.auctions[props.auctionSelectedIndex]["uploadFileName"])

            <div>
              {props.auctions[props.auctionSelectedIndex]["patentType"] ===
                "Image" ? (
                  <img
                    className="responsive"
                    src={
                      ipAddress +
                      "/static/Image/" +
                      props.auctions[props.auctionSelectedIndex]["uploadFileName"]
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: 300
                    }}
                    // TODO write an apt alternative.
                    alt="Something from unsplash it"
                  />
                ) : (
                  <div className="">
                    <img
                      // TODO import it in imports at the top
                      src="../assets/music.png"
                      style={audioThumbStyle}
                      alt=""
                    />

                    <audio controls className="m-2" style={audioStyle}>
                      <source
                        // TODO define a variable for this
                        src={
                          ipAddress +
                          "/static/Audio/" +
                          props.auctions[props.auctionSelectedIndex][
                          "uploadFileName"
                          ]
                        }
                      />
                    </audio>
                  </div>
                )}
            </div>
          ) : (
              <React.Fragment />
            )}
        </section>
      </section>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    bidFormState: state.bidding.bidFormState,
    bidAmount: state.bidding.bidAmount,
    auctions: state.bidding.auctions,
    auctionSelectedIndex: state.bidding.auctionSelectedIndex,
    userInfo: state.login.userInfo,
    showModal: state.modal.visible
  };
};

const mapDispatchToProps = {
  changeBidFormState,
  changeBidAmount,
  submitBid,
  changeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IpDetails);
