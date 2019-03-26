import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = { timeNow: Date.now() };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ timeNow: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <div className="timer">
        <p>User Id: {this.props.id} </p>
        <Spinner time={this.state.timeNow - this.props.startTime} />
        <button className="nhsuk-button" onClick={this.props.onStop}>Stop</button>
      </div>
    );
  }
}

Timer.propTypes = {
  onStop: PropTypes.func.isRequired
}

export default Timer;
