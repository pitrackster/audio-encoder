# AUDIO - ENCODER

An audio encoder that uses React / Electron / fluent-ffmpeg & ffmpeg-static

### INSTALL

`npm install`

### SCRIPTS

- `npm run build:react`
- `npm run build`
- `npm start`

### @TODO

Well ... a lot ;-)

- handle parameters update
  - ~~user should be able to choose the export format~~
  - ~~user should be able to choose where to export encoded files~~
  - ~~the app should use export format settings~~

- progress bar (global ? / per file ?)
- handle errors, check if ffmpeg can read selected files ...
- nice UI
- [internationalization  / translations](https://github.com/i18next/react-i18next)
- electron [menus](https://electronjs.org/docs/api/menu) ?
- tests \\(°_O)/
- make release(s) (ie build app)
- add app icon
- when file explorer open on linux it shows : Electron "" is ready... what is that ?
- test it on mac / windows
- it could also be interresting to use 


```javascript
ffmpeg.getAvailableCodecs((err, result) => {
      console.log('available codecs', result)
    })

    ffmpeg.availableFormats((err, result) => {
      console.log('available formats', result)
    })

    ffmpeg.availableEncoders((err, result) => {
      console.log('available encoders', result)
    })
```
to get format / encoders / codecs and so on... BUT
- Is there a way to get each codec parameters ?
- Is there a way to get the relation between format <-> codec <-> encoder ? 


```javascript
    ffmpeg('path/to/file.wav')
        .audioBitrate(96) // will force constant bit rate... range highly depends on codec
        .audioQuality(this.state.parameters.selectedFormat.q) // will allow variable bit rate which is better than CBR... range depends on codec
        .audioCodec(this.state.parameters.selectedFormat.codec)
        .audioFrequency(this.state.parameters.selectedFormat.samplerate)
        .toFormat(this.state.parameters.selectedFormat.format)        
        .on('progress', (progress) => {
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('stderr', (stderrLine) => {
          console.log('Stderr output: ' + stderrLine) // very verbose
        })
        .on('error', (err) => {
          console.log('An error occurred: ' + err.message)
        })
        .on('end', (stdout, stderr) => {
            // stdout is very verbose... see if it is useful to have it...
          console.log('Transcoding succeeded !', stdout, stderr)
        })
        .save(destination)
    })
```


### Electron usefull Shortcuts

- reload electron window `ctrl + r`
- open dev tools `ctrl + i`