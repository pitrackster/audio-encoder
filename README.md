# AUDIO - ENCODER

An audio encoder that uses React / Electron / fluent-ffmpeg & ffmpeg-static

### INSTALL

`npm install`

### SCRIPTS

- `npm run build:react`
- `npm run build`
- `npm start`

### @TODO

... a lot ;-)

- handle parameters update
  - user should be able to choose the export format
  - user should be able to choose where to export encoded files
  - the program should use export format settings

- export settings.

Depending on the export format parameters could differ
There is no documentation for fluent-ffmpeg for each codec and there parameters

``` javascript
    {
        name: 'MP3',
        codec: 'libmp3lame',
        extension: 'mp3',
        format: 'mp3',
        bitrates: [128, 192, 256], // useless if we want to use VBR
        samplerates: [44100, 48000],
        q: {
            min:0, // best quality
            max:9
        }
    },
```


- Real UI