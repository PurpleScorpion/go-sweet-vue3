const path = require('path')
const glob = require('glob')
const files = glob.sync(path.join(__dirname, '/**/*.cjs').replace(/\\/g, '/'))
files.forEach((element) => {
  require(element)
  console.log(element)
})