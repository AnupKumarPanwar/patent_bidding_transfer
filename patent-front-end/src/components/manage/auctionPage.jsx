import React, { Component } from "react";
import { TextField, Button, DialogContainer } from "react-md";
import axios from "axios";
import controller from "../../controller";
import { patentForAuctionThunk } from "../../store/thunk/managePatentThunk";
import { connect } from "react-redux";
import service from "../../services/patentService";
class AuctionForm extends Component {
  state = {
    minimumBid: "",
    numberOfDays: "",
    submitButtonState: false
  };

  handleFieldChange = (value, event) => {
    this.setState({ [event.target.id]: value });
  };

  handleOnSubmit = () => {
    console.log("on Submit")
    this.setState({ submitButtonState: true });
    const obj = {
      username: this.props.user.username,
      publicAddress: this.props.user.publicAddress,
      patentId: this.props.patentIndex,
      minimumBid: this.state.minimumBid,
      numberOfDays: this.state.numberOfDays
    };
    service.auctionMyPatent(obj).then(res => {
      alert(res.message);
      if (res.success) {
        this.props.history.replace("/dashboard/auction");
      }
      this.setState({ submitButtonState: false });
    });
  };

  render() {
    return (
      <div className="md-grid">
        <TextField
          id="minimumBid"
          value={this.state.minimumBid}
          onChange={this.handleFieldChange}
          type="number"
          className="md-cell md-cell--12"
          placeholder="Minimum bid (in eth) : "
        />
        <TextField
          id="numberOfDays"
          value={this.state.numberOfDays}
          onChange={this.handleFieldChange}
          type="number"
          className="md-cell md-cell--12"
          placeholder="Number of Days of Auction : "
        />
        <Button
          raised
          primary
          children="Submit"
          className="md-cell m-2"
          disabled={this.state.submitButtonState}
          onClick={() => {
            this.handleOnSubmit();
          }}
        />
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    patents: state.patent.patents,
    user: state.login.userInfo
  };
};

export default connect(mapsStateToProps)(AuctionForm);
