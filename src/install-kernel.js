#!/usr/bin/env node
const dataDirs = require('jupyter-paths').dataDirs()
const fs = require('fs')
const path = require('path')

if (!dataDirs[0]) {
  throw new Error("Jupyter paths reported empty dataDirs")
}

const baseDir = path.join(dataDirs[0], 'kernels', 'nodejs')
const kernelSpec = JSON.stringify({
  argv: [
    "inodejskernel",
    "{connection_file}"
  ],
  "display_name": "Node.js",
  "language": "javascript"
})

fs.mkdir(baseDir, (err) => {
  if (err && err.code !== 'EEXIST') {
    console.error(err)
    process.exit(1)
  }
  fs.writeFileSync(path.join(baseDir, 'kernel.json'), kernelSpec)

})

// fs.mkdirSync(baseDir)
