const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const sharp = require('sharp')

if (process.argv.length < 3) {
  console.log("Input format:\n$node img2webp <absolute-path-to-folder>")
  exit()
}
const pathTofolder = process.argv.slice(2)[0]
const pathToconverted = path.join(pathTofolder, "/converted")

let total = 0;
fs.readdir(pathTofolder, (err, dir) => {
  if (err) {
    console.log(err.message)
    exit()
  }
  // Making a Directory named converted inside same folder
  fs.mkdirSync(pathToconverted, { recursive: true })
  dir.map((file) => {
    let status = fs.statSync(pathTofolder + '/' + file)

    if (!status.isDirectory()) {

      sharp(path.resolve(pathTofolder, file))
        .webp()// can pass option like lossless, quality..
        .toFile(`${pathToconverted + "/" + file.split('.')[0]}.webp`, (error, info) => {
          if (error) {
            console.log(error.message)
            exit()
          }
        })
    }

  })
  console.log('\x1b[32m%s\x1b[0m', "All Images are converted")
})