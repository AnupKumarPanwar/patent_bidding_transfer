import React from 'react';
import { Paper, Divider, TextField } from "react-md";
import { DataTable, TableRow, TableColumn, Button } from 'react-md';
import { connect } from "react-redux";
import { changeBidAmount, changeBidFormState } from "../../store/actions/bidding/BiddingActions";
import { submitBid } from "../../store/thunk/biddingThunk";

const IpDetails = props => {

  return (
    <Paper
      className="md-grid"
      style={{
        height: "100%"
      }}>

      <section id="IpContainerText" className="    md-cell md-cell--6  d-flex flex-column" >

        <DataTable plain={true}>

          {

            props.auctions.length > 0

              ?

              Object.keys(props.auctions[props.auctionSelectedIndex]).map(key => (
                <TableRow>
                  <TableColumn>
                    <b>{key} : </b>
                  </TableColumn>
                  <TableColumn>
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

        <Divider className="m-2" />

        <Button
          primary={!props.bidFormState}
          raised
          className="m-4"
          style={{
            alignSelf: "center"
          }}
          onClick={() => {
            props.changeBidFormState(props.bidFormState, props.bidFormState ? null : props.bidAmount)
          }
          }
        >
          {props.bidFormState ? "Cancel" : "Bid"}
        </Button>

        {
          props.bidFormState

            ?

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
                  className="m-2 p-2"
                  primary
                  raised
                  onClick={() => {
                    props.submitBid({
                      publicAddress : props.userInfo.publicAddress,
                      auctionId : props.auctions[props.auctionSelectedIndex].auctionId,
                      bidAmount: props.bidAmount
                    })
                  }}
                >Submit</Button>
              </div>
            </div>

            :
            <React.Fragment></React.Fragment>
        }

      </section>


      <section id="IpContainerImage" className="border-left md-cell md-cell--6">
        <section style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <img className="responsive" src="https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg" style={{
            width: "100%",
            height: "100%",
            maxWidth: 300,
          }} alt="Something from unsplash it" />
        </section>
      </section>

    </Paper >


  )
}

const mapStateToProps = state => {
  return {
    bidFormState: state.bidding.bidFormState,
    bidAmount: state.bidding.bidAmount,
    auctions: state.bidding.auctions,
    auctionSelectedIndex: state.bidding.auctionSelectedIndex,
    userInfo : state.login.userInfo
  }
}

const mapDispatchToProps = {
  changeBidFormState,
  changeBidAmount,
  submitBid
}

export default connect(mapStateToProps, mapDispatchToProps)(IpDetails);