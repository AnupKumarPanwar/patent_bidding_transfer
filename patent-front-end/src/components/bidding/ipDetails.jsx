import React from 'react';
import { Paper, Divider, TextField } from "react-md";
import { DataTable, TableRow, TableColumn, Button } from 'react-md';
import { connect } from "react-redux";
import { changeBidAmount, changeBidFormState } from "../../store/actions/bidding/BiddingActions";
import { submitBid } from "../../store/thunk/biddingThunk";

const IpDetails = props => {
  const imgStyle = { width: '100%', height: 220 };
  const audioThumbStyle = { width: '250', height: 250 };
  const audioStyle = { width: "100%" };
  return (
    <Paper
      className="md-grid"
      style={{
        height: "100%"
      }}>

      <section id="IpContainerText" className="    md-cell md-cell--6  d-flex flex-column" >

          {
            props.auctions.length > 0
              ?
              <React.Fragment>
                <DataTable plain={true}>
                  {Object.keys(props.auctions[props.auctionSelectedIndex]).map(key => (
                    <TableRow>
                      <TableColumn>
                        <b>{key} : </b>
                      </TableColumn>
                      <TableColumn>
                        {props.auctions[props.auctionSelectedIndex][key]}
                      </TableColumn>
                    </TableRow>
                  ))}


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


              </React.Fragment>


              : <TableRow>
                <TableColumn>
                  <h3 className="m-2" style={{ color: "red" }}>
                    No Active Auctions
                  </h3>
                </TableColumn>
              </TableRow>

          }


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
                  publicAddress: props.userInfo.publicAddress,
                  auctionId: props.auctions[props.auctionSelectedIndex].auctionId,
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
          {
            props.auctions.length > 0
              ?
              // console.log(props.auctions[props.auctionSelectedIndex]["uploadFileName"])


              <div>
                {
                  props.auctions[props.auctionSelectedIndex]["patentType"] === "Image"
                    ?
                    <img className="responsive" src={"http://localhost:4000/static/Image/" + props.auctions[props.auctionSelectedIndex]["uploadFileName"]} style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: 300,
                    }} alt="Something from unsplash it" />
                    :
                    <div className="">

                      <img
                        src={'http://localhost:3000/assets/music.png'}
                        style={audioThumbStyle}
                        alt=''
                      />

                      <audio controls className="m-2" style={audioStyle}>
                        <source src={'http://localhost:4000/static/Audio/' + props.auctions[props.auctionSelectedIndex]["uploadFileName"]} />
                      </audio>

                    </div>
                }

              </div>

              :
              <React.Fragment></React.Fragment>
          }

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
    userInfo: state.login.userInfo
  }
}

const mapDispatchToProps = {
  changeBidFormState,
  changeBidAmount,
  submitBid
}

export default connect(mapStateToProps, mapDispatchToProps)(IpDetails);