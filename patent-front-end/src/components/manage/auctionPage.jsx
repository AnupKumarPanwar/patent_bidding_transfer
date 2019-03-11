import React, { Component } from "react";
import { TextField, Button, DialogContainer } from "react-md";
import axios from "axios";
import controller from "../../controller";
import { patentForAuctionThunk } from "../../store/thunk/managePatentThunk";
import { connect } from "react-redux";
import CustomModal from "../common/CustomModal";
import { changeModal } from "../../store/actions/modal/ModalActions";
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
        if (res.success) {
          this.props.changeModal(true, 'Success', res.message);
          this.props.history.replace("/dashboard/auction");
        }
        else {
          this.props.changeModal(true, 'Error', res.message);
        }
        this.setState({ submitButtonState: false });
      });
  };

  render() {
    return (
      <div className="md-grid">
        <CustomModal visible={this.props.showModal} />
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

const mapStateToProps = state => {
  return {
    patents: state.patent.patents,
    user: state.login.userInfo,
    showModal: state.modal.visible
  };
};


const mapDispatchToProps = {
  changeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionForm);
