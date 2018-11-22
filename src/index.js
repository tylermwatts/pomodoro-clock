import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: "00:00"
    };
    this.resetClock = this.resetClock.bind(this);
    this.adjustLength = this.adjustLength.bind(this);
  }

  resetClock() {
    this.setState({ breakLength: 5, sessionLength: 25, timeLeft: "00:00" });
  }

  adjustLength(e) {
    let btnId = e.target.id;
    switch (btnId) {
      case "break-decrement":
        if (this.state.breakLength > 1) {
          this.setState({ breakLength: this.state.breakLength - 1 });
        }
        break;
      case "break-increment":
        if (this.state.breakLength < 60) {
          this.setState({ breakLength: this.state.breakLength + 1 });
        }
        break;
      case "session-decrement":
        if (this.state.sessionLength > 1) {
          this.setState({ sessionLength: this.state.sessionLength - 1 });
        }
        break;
      case "session-increment":
        if (this.state.sessionLength < 60) {
          this.setState({ sessionLength: this.state.sessionLength + 1 });
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <p id="break-label">Break Length</p>
        <p id="break-length">{this.state.breakLength}</p>
        <button id="break-decrement" onClick={e => this.adjustLength(e)}>
          -
        </button>
        <button id="break-increment" onClick={e => this.adjustLength(e)}>
          +
        </button>
        <p id="session-label">Session Length</p>
        <p id="session-length">{this.state.sessionLength}</p>
        <button id="session-decrement" onClick={e => this.adjustLength(e)}>
          -
        </button>
        <button id="session-increment" onClick={e => this.adjustLength(e)}>
          +
        </button>
        <p id="timer-label">Session</p>
        <p id="time-left">{this.state.timeLeft}</p>
        <button id="start_stop">start/stop</button>
        <button id="reset" onClick={this.resetClock}>
          Reset
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PomodoroClock />, rootElement);
