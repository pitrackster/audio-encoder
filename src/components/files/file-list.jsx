import React, { Component } from 'react'
import PropTypes from 'prop-types'
const path = require('path')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './files.scss'

class FileList extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.files.length === 0 ?
          <div>Aucun fichier sélectionné</div>
          :
          this.props.files.map( (file, index) =>
            <React.Fragment key={index}>
              <div className="row file-row">
                <div className="col">{path.parse(file).name}</div>
                <div className="col-xs-2 text-right"> 
                  <button className="btn btn-link text-dark" onClick={() => this.props.onDelete(index)}><FontAwesomeIcon icon="trash"/></button> 
                </div>
              </div>
            </React.Fragment>
          )}
      </div>
    )
  }
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onDelete: PropTypes.func
}

export default FileList