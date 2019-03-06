import React, { Component } from "react";
import { Button } from "react-md";
import axios from "axios";
import { ipAddress } from "../../controller";

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
      let x = setInterval(function() {
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
              alert(res.data.data.winner);
              self.setState({
                transferButtonVisibility: true,
                winner: res.data.data.winner
              });
            });
        }
      }, 1000);
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
        alert(res.data);
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

export default Timer;
