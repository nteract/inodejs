#!/usr/bin/env node

const fs = require('fs');
const Kernel = require('jp-kernel');

const connectionFile = process.argv[2];

if (!connectionFile) {
  console.error(`Invalid connection file ${connectionFile}`);
  process.exit(1);
}

const nodeVersion = process.versions.node;
const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..' , 'package.json'))).version;
const kernelInfoReply = {
    'protocol_version': '5.0',
    'implementation': 'inodejs',
    'implementation_version': version,
    'language_info': {
        'name': 'javascript',
        'version': process.versions.node,
        'mimetype': 'application/javascript',
        'file_extension': '.js',
    },
    'banner': `INodeJS v${version}\nhttps://github.com/rgbkrk/inodejs`,
    'help_links': [
      {
        'text': 'Mozilla Developer Network - JS',
        'url': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        'text': 'NodeJS Documentation',
        'url': 'https://nodejs.org/en/docs/',
      },
    ],
};

const config = {
  hideUndefined: true,
  protocolVersion: kernelInfoReply.protocolVersion,
  kernelInfoReply,
  connnection: JSON.parse(fs.readFileSync(connectionFile)),
};

// Start kernel
const kernel = new Kernel(config);

// Kill the kernel on SIGINT
process.on('SIGINT', function() {
    kernel.destroy();
});
