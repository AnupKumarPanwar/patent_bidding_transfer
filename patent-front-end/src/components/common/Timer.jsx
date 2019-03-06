import React, { Component } from "react";

class Timer extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  componentDidMount() {
    var now = new Date().getTime();
    var endTime = this.props.seconds;
    var diff = endTime - now;
    var x = null;
    if (diff < 0) {
      x = setInterval(() => {
        now = new Date().getTime()
        diff = endTime - now;
        console.log(diff);
        
        if (diff > 0) {
          let days = Math.floor(diff / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((diff % (1000 * 60)) / 1000);

          self.setState({ days, hours, minutes, seconds });
        }
        else {
          clearInterval(x);
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
