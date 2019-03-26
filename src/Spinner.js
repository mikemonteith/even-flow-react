import React, { Component } from 'react';
import './Spinner.scss'

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="clock">
          <div className="frame">
            <div className="number">{this.mins()}</div>
            <div className="loader">Loading...</div>
            </div>
        </div>
      </div>
    )
  }

  mins() {
    const ms = this.props.time;
    return Math.floor(ms / 60000);
  }
}

export default Spinner;
