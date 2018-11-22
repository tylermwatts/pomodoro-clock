import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class PomodoroClock extends React.Component {
  render() {
    return (
      <div>
        <p id="break-label">Break Length</p>
        <p id="session-label">Session Length</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PomodoroClock />, rootElement);
