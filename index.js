const MapSlicer = require('mapslice')

// The parameters passed here are equal to the command-line parameters
const mapSlicer = new MapSlicer({
  file: `${__dirname}/map.jpg`,               // (required) Huge image to slice
  output: `${__dirname}/map/{z}/{y}/{x}.png`, // Output file pattern
  tileSize: 256,                     // (default: 256) Tile-size to be used
  imageMagick: false,                 // (default: false) If (true) then use ImageMagick instead of GraphicsMagick
  background: '#00000000',           // (default: '#FFFFFFFF') Background color to be used for the tiles. More: http://ow.ly/rsluD
  tmp: './temp',                     // (default: '.tmp') Temporary directory to be used to store helper files
  parallelLimit: 3,                  // (default: 5) Maximum parallel tasks to be run at the same time (warning: processes can consume a lot of memory!)
  minWidth: 200,                     // See explanation about Size detection below
  skipEmptyTiles: true,              // Skips all the empty tiles
  bitdepth: 8,                       // (optional) See http://aheckmann.github.io/gm/docs.html#dither
  dither: true,                      // (optional) See http://aheckmann.github.io/gm/docs.html#bitdepth
  colors: 128,                       // (optional) See http://aheckmann.github.io/gm/docs.html#colors
  autoStart: false,                  // (default: false) Automatically runs .start() if true
  gm: require('gm')                  // (optional) Alternative way to specify the GraphicsMagic library
})

mapSlicer.on('start', (files, options) => console.info(`Starting to process ${files} files.`))
mapSlicer.on('error', err => console.error(err))
mapSlicer.on('warning', err => console.warn(err))
mapSlicer.on('progress', progress => console.info(`Progress: ${Math.round(progress*100)}%`))
mapSlicer.on('end', () => console.info('Finished processing slices.') )
mapSlicer.start()