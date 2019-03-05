import React, { Component } from "react";

class Timer extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  constructor() {
    super();
    this.x = null;
  }

  componentWillUnmount() {
    clearInterval(this.x);
  }

  render() {
    // const time = this.state.time;

    const timer = () => {

      
      // Update the count down every 1 second
      let self = this;
      this.x = setInterval(function() {
        let countDownDate = self.props.seconds;
        
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        self.setState({ days, hours, minutes, seconds });

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(this.x);
        }
      }, 1000);
      // return <p>Hey</p>;
    };

    (this.props.seconds - new Date().getTime()) > 0 ? timer() : null;
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
