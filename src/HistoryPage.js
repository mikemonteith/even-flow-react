import React, { Component } from 'react';


class HistoryPage extends Component {

  render() {
    return (
      <div className="history-page">
        {this.props.history.map((log, i) => (
          <p key={i}>
            ScanID: { log.userId }
            <br/>
            Duration: { this.mins(log.duration) } mins
            <br/>
            Stage: { log.stage.label }
          </p>
        ))}
      </div>
    )
  }

  mins(duration) {
    return Math.floor(duration / 60000)
  }
}

export default HistoryPage
