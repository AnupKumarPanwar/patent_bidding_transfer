import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Divider,
  Button,
  TableRow,
  DataTable,
  TableColumn
} from "react-md";

import "../css/patentPage.scss";
import AuctionForm from "./auctionPage";
import { connect } from "react-redux";

import { showAuctionAction } from "../../store/actions/patent/PatentAction";
import service from "../../services/patentService";
import { ipAddress } from "../../controller";

class PatentPage extends Component {
  state = {
    patent: {
      owners: []
    },
    patentIndex: "",
    
  };

  componentDidMount() {
    const patentIndex = this.props.match.params.id;

    // TODO Define a thunk for it. also in other files too.
    service
      .getPatent({ id: patentIndex })
      .then(async res => {
        this.setState({ patent: res.message, patentIndex });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.props.showAuctionAction(true, this.props.visibleTransfer);
  }

  render() {
    const audioThumbStyle = { width: 250, height: 250 };
    // const audioStyle = { width: 100 };
    console.log();
    return (
      <div className="md-grid">
        <Card className="md-cell md-cell--6 md-text-container">
          <CardTitle title={"Patent Name"} />
          <CardText>
            <DataTable plain={true}>
              {Object.keys(this.state.patent).map(key => (
                <TableRow>
                  <TableColumn>
                    <b>{key}</b>
                  </TableColumn>

                  <TableColumn>
                    {key === "issueDate"
                      ? new Date(
                          parseInt(this.state.patent[key])
                        ).toLocaleString()
                      : this.state.patent[key]}
                  </TableColumn>
                </TableRow>
              ))}
            </DataTable>

            <Divider className="m-3" />

            {this.state.patent === {} ? (
              <React.Fragment />
            ) : this.state.patent.owners.includes(
                this.props.userInfo.publicAddress
              ) ? (
              <Button
                flat
                secondary
                swapTheming
                className="action-button"
                onClick={() =>
                  this.props.showAuctionAction(
                    this.props.visibleAuction,
                    this.props.visibleTransfer
                  )
                }
              >
                Auction
              </Button>
            ) : (
              <React.Fragment />
            )}
          </CardText>

          {this.props.visibleAuction && (
            <AuctionForm
              key={this.state.patentIndex}
              patentIndex={this.state.patentIndex}
              history={this.props.history}
            />
          )}

          {/* <TransferForm visible={this.state.visible_transfer}/> */}
        </Card>

        <section
          id="IpContainerImage"
          className="border-left md-cell md-cell--6"
        >
          <div
            // TODO define a class
            className=" d-flex justify-content-center align-items-center"
            style={{
              height: "80vh"
            }}
          >
            <div className="border">
              {this.state.patent.uploadFileName ? (
                this.state.patent.patentType === "Image" ? (
                  <img
                    className="responsive"
                    src={
                      ipAddress +
                      "/static/Image/" +
                      this.state.patent.uploadFileName
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: 500
                    }}
                    // TODO write an apt alternative.
                    alt="Something from unsplash it"
                  />
                ) : (
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{
                      width: "80vh",
                      height: "60vh"
                    }}
                  >
                    <img src="/assets/music.png" style={audioThumbStyle} />
                    
                    <audio  controls className="m-2">
                      <source
                        src={
                          ipAddress +
                          "/static/Audio/" +
                          this.state.patent.uploadFileName
                        }
                      />
                    </audio>
                  </div>
                )
              ) : (
                "Please wait ... Loading Your Patent "
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visibleAuction: state.patent.visibleAuction,
    patents: state.patent.patents,
    visibleTransfer: state.patent.visibleTransfer,
    userInfo: state.login.userInfo
  };
};

const mapDispatchToProps = {
  showAuctionAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatentPage);
