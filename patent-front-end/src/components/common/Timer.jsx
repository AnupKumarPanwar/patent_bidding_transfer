import React, { Component } from "react";
import { Button } from "react-md";
import axios from "axios";
import { ipAddress } from "../../controller";
import { connect } from "react-redux";
import CustomModal from "../common/CustomModal";
import { changeModal } from "../../store/actions/modal/ModalActions";

class Timer extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    transferButtonVisibility: false,
    winner: null
  };

  componentDidMount() {
    if (this.props.seconds - new Date().getTime() > 0) {
      const self = this;
      let x = setInterval(function () {
        let distance = self.props.seconds - new Date().getTime();
        if (distance > 0) {
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          self.setState({ days, hours, minutes, seconds });
        } else {
          self.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(x);
          axios
            .post(ipAddress + "/auction/getResult", {
              auctionId: self.props.auctionId
            })
            .then(res => {
              this.props.changeModal(true, 'Winner', res.data.data.winner);
              self.setState({
                transferButtonVisibility: true,
                winner: res.data.data.winner
              });
            });
        }
      }, 1000);
    } else {
      try {
        axios
          .post(ipAddress + "/auction/getResult", {
            auctionId: this.props.auctionId
          })
          .then(res => {
            this.props.changeModal(true, 'Winner', res.data.data.winner);
            this.setState({
              transferButtonVisibility: true,
              winner: res.data.data.winner
            });
          });
      } catch (ex) {
        console.log(ex)
      }

    }
  }

  tranferPatent = () => {
    axios
      .post(ipAddress + "/manage/transferPatent", {
        data: {
          patentId: this.props.patentId,
          sender: this.props.sender,
          receiver: this.state.winner
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.changeModal(true, 'Winner', res.data.message);
        }
        else {
          this.props.changeModal(true, 'Error', res.data.message);
        }
        // alert(res.data);
        // self.setState({
        //   transferButtonVisibility: true,
        //   winner: res.data.data.winner
        // });
      });
  };

  render() {
    return (
      <div>
        <div>
          <CustomModal visible={this.props.showModal} />
          {this.state.transferButtonVisibility ? (
            <div className="d-flex flex-column">
              <p>
                <b>Winner </b>: {this.state.winner}
              </p>
              <Button
                primary
                raised
                className="rounded align-self-right"
                onClick={() => this.tranferPatent()}
              >
                Transfer
              </Button>{" "}
            </div>
          ) : (
              <div>
                Time left :
              <p className="text-primary">
                  {this.state.days} d {this.state.hours} h {this.state.minutes} m{" "}
                  {this.state.seconds} s
              </p>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: state.modal.visible,
    seconds: ownProps.seconds,
    auctionId: ownProps.auctionId,
    patentId: ownProps.patentId,
    sender: ownProps.sender
  };
};


const mapDispatchToProps = {
  changeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);