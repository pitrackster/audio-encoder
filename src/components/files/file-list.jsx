import React, { Component } from 'react'
import PropTypes from 'prop-types'
const path = require('path')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FileList extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      this.props.files.map( (file, index) =>
        <React.Fragment key={index}>
          <div className="row">
            <div className="col">{path.parse(file.name).name}</div>
            <div className="col"> 
              <button className="btn btn-light" onClick={() => this.props.onDelete(index)}><FontAwesomeIcon icon="trash"/></button> 
            </div>
          </div>
        </React.Fragment>
      )
      
    )
  }
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onDelete: PropTypes.func
}

export default FileList