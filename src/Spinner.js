import React, { Component } from 'react';
import './Spinner.scss'

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div class="clock">
          <div class="frame">
            <div class="number">{this.mins()}</div>
            <div class="loader">Loading...</div>
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
