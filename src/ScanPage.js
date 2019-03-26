import React, { Component } from 'react';

import Scanner from './Scanner';
import Timer from './Timer';

class ScanPage extends Component {

  render() {
    return (
      <div className="scan-page">
        <p>{this.props.stage.label}</p>
        {this.props.lastScan === null ? (
          <Scanner onDetected={this.props.onDetected} />
        ) : (
          <Timer onStop={this.props.onStop} id={this.props.lastScan.codeResult.code }/>
        )}
      </div>
    )
  }
}

export default ScanPage
