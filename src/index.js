import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      running: false
    };
    this.getStartTime = this.getStartTime.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.adjustLength = this.adjustLength.bind(this);
  }

  getStartTime() {
    return this.state.sessionLength.toString() + ":00";
  }

  resetClock() {
    this.setState({ breakLength: 5, sessionLength: 25 });
  }

  toggleTimer() {
    this.setState({ running: !this.state.running });
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
      <div id="main" className="container">
        <span id="break-session-row" className="row">
          <div id="break-display">
            <p id="break-label">Break Length</p>
            <p id="break-length">{this.state.breakLength}</p>
            <span id="break-button-row" className="row">
              <button
                className="btn btn-default"
                id="break-decrement"
                onClick={e => this.adjustLength(e)}
              >
                -
              </button>
              <button
                className="btn btn-default"
                id="break-increment"
                onClick={e => this.adjustLength(e)}
              >
                +
              </button>
            </span>
          </div>
          <div id="session-display">
            <p id="session-label">Session Length</p>
            <p id="session-length">{this.state.sessionLength}</p>
            <span id="session-button-row" className="row">
              <button
                className="btn btn-default"
                id="session-decrement"
                onClick={e => this.adjustLength(e)}
              >
                -
              </button>
              <button
                className="btn btn-default"
                id="session-increment"
                onClick={e => this.adjustLength(e)}
              >
                +
              </button>
            </span>
          </div>
        </span>
        <span id="session-countdown" className="row">
          <p id="timer-label">Session</p>
          <p id="time-left">{this.getStartTime()}</p>
          <span className="row" id="start-reset-buttons">
            <button
              className="btn btn-default"
              id="start_stop"
              onClick={this.toggleTimer}
            >
              {this.state.running ? "Stop" : "Start"}
            </button>
            <button
              className="btn btn-default"
              id="reset"
              onClick={this.resetClock}
            >
              Reset
            </button>
          </span>
        </span>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PomodoroClock />, rootElement);
