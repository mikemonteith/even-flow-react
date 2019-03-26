import React, { Component } from 'react';

const Checkbox = (props) => (
  <div className="nhsuk-radios__item">
    <input className="nhsuk-radios__input" onChange={() => props.onSelect(props.id, props.label)} id={props.id} name={props.name} type="radio" value={props.label} />
    <label className="nhsuk-label nhsuk-radios__label" for={props.id}>
      { props.label }
    </label>
  </div>
)

class ChooseStagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      label: null,
    }
  }

  render() {
    return (
      <div className="choose-stage-page">
        <div className="nhsuk-form-group">
          <fieldset className="nhsuk-fieldset" aria-describedby="example-hint">
            <legend class="nhsuk-fieldset__legend">
              Choose your stage
            </legend>
            <Checkbox label="Reception" name="test" id="1" onSelect={this.onSelect.bind(this)} />
            <Checkbox label="Waiting Room" name="test" id="2" onSelect={this.onSelect.bind(this)} />
            <Checkbox label="Consultancy" name="test" id="3" onSelect={this.onSelect.bind(this)} />
            <Checkbox label="Biopsy" name="test" id="4" onSelect={this.onSelect.bind(this)} />
          </fieldset>
        </div>
        <button className="nhsuk-button" onClick={this.go.bind(this)} >
          Go to scan
        </button>
      </div>
    )
  }

  go() {
    this.props.onSelected({
      id: this.state.id,
      label: this.state.label,
    });
  }

  onSelect(id, label) {
    this.setState({ id, label });
  }
}

export default ChooseStagePage;
