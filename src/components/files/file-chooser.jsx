import React, { Component } from 'react'
import PropTypes from 'prop-types'

const {dialog, app} = require('electron').remote



// https://electronjs.org/docs/api/dialog

class FileChooser extends Component {
  constructor(props){
    super(props)
  }

  openDialog() {
    const files = dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Audio', extensions: ['mp3', 'ogg', 'wav', 'aiff', 'flac', 'opus'] }
      ],
      defaultPath: app.getPath('music')
    })
    console.log('audio selected' , files)
  }
    

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Fichier(s) à encoder</label>
          <input type="file" id="input" accept="audio/*" className="form-control"  multiple onChange={(e) => this.props.onChange(e.target.files)} />
        </div>  
        <hr/>
        <button onClick={() => this.openDialog()}>choisir les fichiers</button>

      </div>
     
    )
  }
}

FileChooser.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default FileChooser