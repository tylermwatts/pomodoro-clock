import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      running: false,
      currSeshMins: 0,
      currSeshSecs: 0,
      currBreakMins: 0,
      currBreakSecs: 0,
      intervalID: 0,
      resumeTimer: false,
      onBreak: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.adjustLength = this.adjustLength.bind(this);
    this.countDown = this.countDown.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.breakCountDown = this.breakCountDown.bind(this);
    this.startBreakTimer = this.startBreakTimer.bind(this);
  }

  startTimer() {
    let intervalID = setInterval(this.countDown, 1000);
    if (!this.state.resumeTimer) {
      this.setState({
        intervalID: intervalID,
        currSeshMins: this.state.sessionLength,
        currSeshSecs: 60,
        currBreakMins: this.state.breakLength,
        currBreakSecs: 60,
        resumeTimer: true
      });
    } else {
      this.setState({
        intervalID: intervalID
      });
    }
  }

  stopTimer() {
    clearInterval(this.state.intervalID);
  }

  resetClock() {
    this.stopTimer();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      running: false,
      currSeshMins: 0,
      currSeshSecs: 0,
      currBreakMins: 0,
      currBreakSecs: 0,
      intervalID: 0,
      resumeTimer: false,
      onBreak: false
    });
    let beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  }

  toggleTimer() {
    if (this.state.running) {
      this.stopTimer();
      this.setState({ running: false });
    } else {
      this.startTimer();
      this.setState({ running: true });
    }
  }

  countDown() {
    if (this.state.currSeshSecs > 0 && this.state.currSeshSecs <= 59) {
      this.setState({ currSeshSecs: this.state.currSeshSecs - 1 });
    } else {
      if (this.state.currSeshMins > 0) {
        this.setState({
          currSeshMins: this.state.currSeshMins - 1,
          currSeshSecs: 59
        });
      } else if (
        this.state.currSeshMins === 0 &&
        this.state.currSeshSecs === 0
      ) {
        this.stopTimer();
        this.setState({ resumeTimer: false, onBreak: true });
        this.startBreakTimer();
        let beep = document.getElementById("beep");
        beep.play();
      }
    }
  }

  startBreakTimer() {
    let intervalID = setInterval(this.breakCountDown, 1000);
    if (!this.state.resumeTimer) {
      this.setState({
        intervalID: intervalID,
        currSeshMins: this.state.sessionLength,
        currSeshSecs: 60,
        currBreakMins: this.state.breakLength,
        currBreakSecs: 60,
        resumeTimer: true
      });
    } else {
      this.setState({
        intervalID: intervalID
      });
    }
  }

  breakCountDown() {
    if (this.state.currBreakSecs > 0 && this.state.currBreakSecs <= 59) {
      this.setState({ currBreakSecs: this.state.currBreakSecs - 1 });
    } else {
      if (this.state.currBreakMins > 0) {
        this.setState({
          currBreakMins: this.state.currSeshMins - 1,
          currBreakSecs: 59
        });
      } else if (
        this.state.currBreakMins === 0 &&
        this.state.currBreakSecs === 0
      ) {
        this.stopTimer();
        this.setState({ resumeTimer: false, onBreak: false });
        this.startTimer();
        let beep = document.getElementById("beep");
        beep.play();
      }
    }
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
          <p id="timer-label">{this.state.onBreak ? "Break" : "Session"}</p>
          <p id="time-left">
            {this.state.onBreak
              ? this.state.currBreakMins < 10
                ? "0" + this.state.currBreakMins
                : this.state.currBreakMins
              : this.state.currSeshMins < 10
              ? "0" + this.state.currSeshMins
              : this.state.currSeshMins}
            :
            {this.state.onBreak
              ? this.state.currBreakSecs === 60
                ? "00"
                : this.state.currBreakSecs < 10
                ? "0" + this.state.currBreakSecs
                : this.state.currBreakSecs
              : this.state.currSeshSecs === 60
              ? "00"
              : this.state.currSeshSecs < 10
              ? "0" + this.state.currSeshSecs
              : this.state.currSeshSecs}
          </p>
          <audio
            id="beep"
            src="http://soundbible.com/grab.php?id=2142&type=mp3"
          />
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
