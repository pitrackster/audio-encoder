import React, { Component } from 'react'
import FileChooser from './components/files/file-chooser.jsx'
import FileList from './components/files/file-list.jsx'

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
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const remote = require('electron').remote
const app = remote.app


class App extends Component {
  constructor(props) {
    super(props)

    // c'est bien moche....
    const ffmpegPath = ffmpegStatic.path.replace(__dirname, './node_modules/ffmpeg-static')
    ffmpeg.setFfmpegPath(ffmpegPath)

    ffmpeg.getAvailableCodecs((err, result) => {
      console.log('available codecs', result)
    })

    ffmpeg.availableFormats((err, result) => {
      console.log('available formats', result)
    })

    ffmpeg.availableEncoders((err, result) => {
      console.log('available encoders', result)
    })

    /*
    Quelques trucs à vérifier...
    - paramètres de chaque codec
    - quels codecs / format
    - quel conteneurs pour les codecs
    - bitrate en bit/s ?* => vrai pour ffmpeg mais pas pour fluent-ffmpeg
    - paramètre "Qualité" => q , comment on gère entre ça et l'ensemble des autres paramètres ?
      - y'en a qui surchargent les autres ?

    * par exemple j'ai trouvé ça
    Also, note the bitrate is in bits/s, not the usual kbits/s. 
    The default bitrate is 96000 (96 kbits/s), which is (of course arguably) a fine value. 
    Sample command to summarize: ffmpeg -i input.flac -acodec libopus -b:a 128000 output.opus
*/

    this.initialState = {
      ffmpeg: ffmpeg,
      files: [],
      parameters: {
        destinationPath: app.getPath('music'),
        format: {
          name: 'AAC',
          codec: 'aac',
          extension: 'm4a',
          format: 'mp4',
          bitrate: 256,
          samplerate: 48000,
          q: 5
        }
      },
      availableFormats: [
        {
          name: 'MP3',
          codec: 'libmp3lame',
          extension: 'mp3',
          format: 'mp3',
          bitrates: [128, 192, 256],
          samplerates: [44100, 48000]
        },
        {
          name: 'AAC',
          codec: 'libfdk_aac',
          extension: 'm4a',
          format: 'aac',
          bitrates: [128, 192, 256],
          samplerates: [44100, 48000],
          q: 5
        },
        {
          name: 'Ogg Opus',
          format: 'opus',
          codec: 'libopus',
          extension: 'ogg',
          bitrates: [128, 192, 256],
          samplerates: [44100, 48000]
        },
        {
          extension: 'opus',
          format: 'opus',
          bitrate: 256,
          samplerate: 44100,
          codec: 'libopus',
          name: 'Ogg Opus',
          q: 10
        }
      ]
    }

    this.state = this.initialState
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip()
  }

  addFiles(fileList) {
    const added = []
    Object.keys(fileList).forEach(index => {
      added.push(fileList[index])
    })

    this.setState(Object.assign(this.state, { files: this.state.files.concat(added) }))
  }

  deleteFile(index) {
    const cloned = Array.from(this.state.files)
    cloned.splice(index, 1)
    this.setState(Object.assign(this.state, { files: cloned }))
  }

  encode() {
    this.state.files.forEach(file => {
      const destination = this.state.parameters.destinationPath + '/' + path.parse(file.name).name + '.' + this.state.parameters.format.extension

      console.log(this.state.parameters.format)
      ffmpeg(file.path)
        //.audioBitrate(96) // will force constant bit rate... 
        .audioQuality(this.state.parameters.format.q) // will allow variable bit rate (better) but range depends on codec / format
        .audioCodec(this.state.parameters.format.codec)
        .audioFrequency(this.state.parameters.format.samplerate)
        .toFormat(this.state.parameters.format.format)
        .save(destination)
        .on('progress', (progress) => {
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('stderr', (stderrLine) => {
          // console.log('Stderr output: ' + stderrLine)
        })
        .on('error', (err) => {
          console.log('An error occurred: ' + err.message)
        })
        .on('end', (stdout, stderr) => {
          console.log('Transcoding succeeded !', stdout, stderr)
        })
    })

    this.setState(Object.assign({}, this.initialState))

    // should set the state to initial state
  }

  render() {
    return (
      <div className="container">
        <hr />
        <FileChooser onChange={(files) => this.addFiles(files)} />
        <hr />
        <div>
          {this.state.files.length === 0 ?
            <div>Aucun fichier</div>
            :
            <div>
              <FileList files={this.state.files} onDelete={(index) => this.deleteFile(index)} />
            </div>
          }
        </div>

        <hr />
        <button onClick={() => this.encode()} className="btn btn-light"><FontAwesomeIcon icon="trash" />GO</button>
      </div>
    )
  }
}

export default App