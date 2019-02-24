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

      <section id="IpContainerText" className=" m-2 md-cell md-cell--5  d-flex flex-column" >
        <DataTable plain={true}>
          {

            ["Patent Name", "Patent Type", "Patent Sub Type", "Patent Owners", "Minimum Bid", "End Date"].map(key => (
              <TableRow>
                <TableColumn>
                  <b>{key} : </b>
                </TableColumn>
                <TableColumn>
                  {key}
                </TableColumn>
              </TableRow>
            ))

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
            props.changeBidFormState(props.bidFormState, props.bidFormState ? null : props.changeBidAmount)
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
                <Button className="m-2 p-2" primary raised>Submit</Button>

              </div>
            </div>

            :
            <React.Fragment></React.Fragment>
        }



      </section>


      <section id="IpContainerImage" className="border-left md-cell md-cell--7">
        <section style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <img className="responsive" src="https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg" style={{
            width: "100%",
            height: "100%",
            maxWidth: 400,
          }} alt="Something from unsplash.it" />
        </section>
      </section>

    </Paper >


  )
}

const mapStateToProps = state => {
  return {
    bidFormState: state.bidding.bidFormState,
    bidAmount: state.bidding.bidAmount
  }
}

const mapDispatchToProps = {
  changeBidFormState,
  changeBidAmount,
  submitBid
}

export default connect(mapStateToProps, mapDispatchToProps)(IpDetails);