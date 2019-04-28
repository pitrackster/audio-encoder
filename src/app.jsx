import React, { Component } from 'react'
import FileChooser from './components/files/file-chooser.jsx'
import FileList from './components/files/file-list.jsx'
import ExportFormat from './components/parameters/export-format.jsx'
import FolderChooser from './components/parameters/folder-chooser'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'bootstrap'
import './app.scss'

library.add(
  fab,
  fas
)

import ffmpegStatic from 'ffmpeg-static'
import {ipcRenderer, remote} from 'electron'
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const app = remote.app

class App extends Component {
  constructor(props) {
    super(props)

    // so ugly...
    const ffmpegPath = ffmpegStatic.path.replace(__dirname, './node_modules/ffmpeg-static')
    ffmpeg.setFfmpegPath(ffmpegPath)

    this.initialState = {
      ffmpeg: ffmpeg,
      files: [],
      parameters: {
        destinationPath: app.getPath('music'),
        selectedFormat: {
          name: 'Ogg',
          format: 'ogg',
          codec: 'libvorbis',
          extension: 'ogg',
          samplerate: 48000,
          samplerates: [44100, 48000],
          q: 10,
          qRange: {
            min:0,
            max:10
          }
        }
      },
      availableFormats: [
        {
          name: 'MP3',
          codec: 'libmp3lame',
          extension: 'mp3',
          format: 'mp3',
          samplerate: 48000,
          samplerates: [44100, 48000],
          q: 0,
          qRange: {
            min:0,
            max:10
          }
        },
        {
          name: 'AAC',
          codec: 'libfaac',
          extension: 'm4a',
          format: 'mp4',
          samplerate: 48000,
          samplerates: [44100, 48000],
          q: 5,
          qRange: {
            min:1,
            max:5
          }
        },
        {
          name: 'Ogg',
          format: 'ogg',
          codec: 'libvorbis',
          extension: 'ogg',
          samplerate: 48000,
          samplerates: [44100, 48000],
          q: 10,
          qRange: {
            min:0,
            max:10
          }
        }
      ]
    }

    this.state = this.initialState
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip()
    // event sent from main process
    ipcRenderer.on('files-update', (event, files) => {
      const added = []
      files.forEach(filePath => {
        added.push(filePath)
      })
      this.setState(Object.assign(this.state, { files: this.state.files.concat(added) }))
    })
  }

  deleteFile(index) {
    const cloned = Array.from(this.state.files)
    cloned.splice(index, 1)
    this.setState(Object.assign(this.state, { files: cloned }))
  }

  encode() {
    this.state.files.forEach((file, index) => {
      const destination = this.state.parameters.destinationPath + '/' + path.parse(file).name + '.' + this.state.parameters.selectedFormat.extension

      //console.debug('start processing file @index ' + index)
      ffmpeg(file)
        //.audioBitrate(96) // will force constant bit rate... 
        .audioQuality(this.state.parameters.selectedFormat.q) // will allow variable bit rate (better) but range depends on codec / format
        .audioCodec(this.state.parameters.selectedFormat.codec)
        .audioFrequency(this.state.parameters.selectedFormat.samplerate)
        .toFormat(this.state.parameters.selectedFormat.format)        
        .on('progress', (progress) => {
          // @TODO should update a progress bar for the corresponding file
        })
        .on('error', (err) => {
          // @TODO the UI should show that this file is on error
        })
        .on('end', (stdout, stderr) => {
          // console.log('Transcoding succeeded !')
          // @TODO: if no error for this file, splice it from state.files ?
        })
        .save(destination)
    })
  }

  updateDestFolder(path) {
    this.setState(Object.assign(this.state.parameters, {destinationPath: path}))
  }

  updateExportFormat(format) {
    this.setState(Object.assign(this.state.parameters, {selectedFormat: format}))
  }

  updateCurrentFormatProperty(prop, value) {
    const updatedFormat = Object.assign({}, this.state.parameters.selectedFormat)
    updatedFormat[prop] = value
    this.setState(Object.assign(this.state.parameters, {selectedFormat: updatedFormat}))
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="row">
          <div className="col">
            <ExportFormat onFormatPropertyChange={(prop, value) => this.updateCurrentFormatProperty(prop, value)} available={this.state.availableFormats} current={this.state.parameters.selectedFormat} onChange={(format) => this.updateExportFormat(format)} />
          </div>
        </div>
        <hr />       
        <FileList files={this.state.files} onDelete={(index) => this.deleteFile(index)} />
        <hr />
        <div className="row">
          <div className="col">
            <FolderChooser title="Choisir le dossier de destination" current={this.state.parameters.destinationPath} onChange={(path) => this.updateDestFolder(path)} />
          </div>
          <div className="col text-right">          
            <button data-toggle="tooltip" title="Encoder les fichiers sélectionnés" onClick={() => this.encode()} className="btn btn-link text-dark"><FontAwesomeIcon icon="file-export" /></button>
          </div>
        </div>
      </div>
    )
  }
}

export default App