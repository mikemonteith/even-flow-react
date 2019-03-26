import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Quagga from 'quagga';

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.onDetected = this._onDetected.bind(this);
  }

  render() {
    return (
      <div className="scanner">
        <h1>Scan to begin session</h1>
        <div id="interactive" className="viewport" />
      </div>
    );
  }

  componentDidMount() {
    Quagga.init({
        inputStream: {
            type : "LiveStream",
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // or user
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
            readers : [ "ean_reader", "code_128_reader" ]
        },
        locate: true,
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: false,
          showLabels: false,
          showPatchLabels: false,
          showRemainingPatchLabels: false,
          boxFromPatches: {
            showTransformed: false,
            showTransformedBox: false,
            showBB: false
          }
        }
    }, function(err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
    });
    Quagga.onDetected(this.onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this.onDetected);
    Quagga.stop();
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }

}

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired
}

export default Scanner;
