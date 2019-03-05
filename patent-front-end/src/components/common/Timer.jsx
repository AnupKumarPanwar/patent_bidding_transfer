import React, { Component } from "react";
import axios from "axios";
import { ipAddress } from "../../controller";

class Timer extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
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
              // console.log(res);
              alert(res.data.data.winner);
            });
        }
      }, 1000);
    }
  }

  render() {
    return (
      <div>
        <div className="border">
          <p id="demo">
            {this.state.days} d {this.state.hours} h {this.state.minutes} m
            {this.state.seconds} s
          </p>
        </div>
      </div>
    );
  }
}

export default Timer;
