import React, { Component } from 'react'

import PropTypes from 'prop-types'

class ExportFormat extends Component {
  constructor(props){
    super(props)
  }

  updateCurrentFormatSamplerate(event) {
    const value = event.target.options[event.target.options.selectedIndex].value
    this.props.onFormatPropertyChange('samplerate', value)
  }

  updateCurrentFormatQ(event) {
    const value = event.target.value
    this.props.onFormatPropertyChange('q', value)
  }

  updateCurrentFormat(event) {
    //console.log(event.target.options, event.target.options[event.target.options.selectedIndex].value)
    const value = event.target.options[event.target.options.selectedIndex].value
    const format = this.props.available.find(format => format.name === value)
    this.props.onChange(format)
  }
    
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="">{decodeURI('Format d\'export')}</label>
              <select className="form-control" value={this.props.current.name} onChange={(e) => this.updateCurrentFormat(e)}>
                {
                  this.props.available.map((format, index)  =>                 
                    <option key={`audio-format-${index}`} value={format.name}>{format.name}</option>               
                  )
                }
              </select>
            </div>
          </div>        
        </div>
        <div className="col">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="">Qualité ({this.props.current.q})</label>
              <input className="form-control" onChange={(e) => this.updateCurrentFormatQ(e)} type="range" min={this.props.current.qRange.min} max={this.props.current.qRange.max} value={this.props.current.q}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="">Samplerate</label>
              <select className="form-control" value={this.props.current.samplerate} onChange={(e) => this.updateCurrentFormatSamplerate(e)}>
                {
                  this.props.current.samplerates.map((samplerate, index) => 
                    <option key={`format-samplerate-${index}`} value={samplerate}>{samplerate} Hz</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>        
      </div>
    )
  }
}

ExportFormat.propTypes = {
  current: PropTypes.object.isRequired,
  available: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onFormatPropertyChange: PropTypes.func.isRequired
}

export default ExportFormat