import React, { Component } from 'react';
import './App.scss';

import ScanPage from './ScanPage';
import HistoryPage from './HistoryPage';
import ChooseStagePage from './ChooseStagePage';

const testScan = JSON.parse('{"codeResult":{"code":"5017303048689","start":39,"end":248,"codeset":"","startInfo":{"error":0.19047619047619047,"code":-1,"start":39,"end":46},"decodedCodes":[{"code":-1,"start":39,"end":46},{"error":0.08333333333333333,"code":0,"start":46,"end":62},{"error":0.052380952380952375,"code":1,"start":62,"end":77},{"error":0.08571428571428573,"code":7,"start":77,"end":92},{"error":0.125,"code":3,"start":92,"end":108},{"error":0.041269841269841255,"code":0,"start":108,"end":123},{"error":0.0825892857142857,"code":3,"start":123,"end":139},{"error":0.14545454545454548,"code":-1,"start":139,"end":150},{"error":0.05238095238095238,"code":0,"start":150,"end":165},{"error":0.08571428571428573,"code":4,"start":165,"end":180},{"error":0.08333333333333334,"code":8,"start":180,"end":196},{"error":0.035714285714285705,"code":6,"start":196,"end":211},{"error":0.08333333333333334,"code":8,"start":211,"end":227},{"error":0,"code":9,"start":227,"end":241},{"error":0.19047619047619047,"code":-1,"start":241,"end":248}],"direction":1,"format":"ean_13"},"line":[{"x":137.99999930669048,"y":256.00931652942313},{"x":406.00221172468434,"y":255.9906768238688}],"angle":-0.00006955056585578512,"pattern":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"box":[[160.00222541336328,288.01557602879194],[159.99777309359752,223.99999680515913],[383.9999856180116,223.98441732450001],[384.0044379377773,287.9999965481328]],"boxes":[[[160.00222541336328,288.01557602879194],[159.99777309359752,223.99999680515913],[383.9999856180116,223.98441732450001],[384.0044379377773,287.9999965481328]]]}'
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //lastScan: testScan,
      lastScan: null,
      stage: null,
      history: [],
      page: 'home',
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.page === 'home' && (
          <nav>
            <div className="nhsuk-promo">
              <a className="nhsuk-promo__link-wrapper" href="#" onClick={() => this.goTo('choose-stage')}>
                <div className="nhsuk-promo__content">
                  <h3 className="nhsuk-promo__heading">Begin Session</h3>
                </div>
              </a>
            </div>

            <div className="nhsuk-promo">
              <a className="nhsuk-promo__link-wrapper" href="#" onClick={() => this.goTo('history')}>
                <div className="nhsuk-promo__content">
                  <h3 className="nhsuk-promo__heading">See History</h3>
                </div>
              </a>
            </div>
          </nav>
        )}

        {this.state.page === 'choose-stage' && (
          <ChooseStagePage onSelected={(item) => {
            this.setState({ stage: item });
            this.goTo('scan');
          }}/>
        )}

        {this.state.page === 'scan' && (
          <ScanPage stage={this.state.stage} lastScan={this.state.lastScan} onDetected={this.onDetected.bind(this)} onStop={this.onStop.bind(this)} />
        )}

        {this.state.page === 'history' && (
          <HistoryPage history={this.state.history} />
        )}
      </div>
    );
  }

  goTo(page) {
    this.setState({ page });
  }

  onDetected(result) {
    this.setState({
      lastScan: result,
      lastScanTime: Date.now(),
    });
  }

  onStop() {
    // when stopped, log an event with the API.
    const { lastScan, lastScanTime } = this.state;
    const stopTime = Date.now();
    const history = this.state.history.slice();

    history.push({
      userId: lastScan.codeResult.code,
      startTime: lastScanTime,
      stopTime: stopTime,
      duration: stopTime - lastScanTime,
    })

    this.setState({
      lastScan: null,
      lastScanTime: null,
      history: history,
    });
  }
}

export default App;
