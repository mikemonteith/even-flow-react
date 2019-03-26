import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Timer extends Component {
  render() {
    return (
      <div className="timer">
        <h1>Session started</h1>
        <p>User Id: {this.props.id} </p>
        <button className="nhsuk-button" onClick={this.props.onStop}>Stop</button>
      </div>
    );
  }
}

Timer.propTypes = {
  onStop: PropTypes.func.isRequired
}

export default Timer;
