import React, { Component } from 'react'
import PropTypes from 'prop-types'



class FileChooser extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="form-group">
        <label>Fichier(s) à encoder</label>
        <input type="file" id="input" accept="audio/*" className="form-control"  multiple onChange={(e) => this.props.onChange(e.target.files)} />
      </div>  
    )
  }
}

FileChooser.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default FileChooser