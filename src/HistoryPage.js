import React, { Component } from 'react';


class HistoryPage extends Component {

  render() {
    return (
      <div className="history-page">
        {this.props.history.map(log => (
          <p>ScanID: { log.userId }</p>
        ))}
      </div>
    )
  }
}

export default HistoryPage
