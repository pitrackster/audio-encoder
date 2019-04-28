import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const {dialog, app} = require('electron').remote


class FolderChooser extends Component {
  constructor(props){
    super(props)
  }

  openDialog() {
    const path = dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath: app.getPath('music')
    })
    this.props.onChange(path[0])
  }
    
  render() {
    return (
      <button title={this.props.title} data-toggle="tooltip" className="btn btn-link text-dark" onClick={() => this.openDialog()}><FontAwesomeIcon icon="folder"></FontAwesomeIcon></button>
    )
  }
}

FolderChooser.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default FolderChooser