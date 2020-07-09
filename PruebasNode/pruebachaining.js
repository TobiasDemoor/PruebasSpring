const fs = require('fs');
const zlib = require('zlib');
const input = fs.createReadStream('big-file.txt');
const zip = zlib.createGzip();
const output = fs.createWriteStream('small-file.txt.gz');
input.pipe(zip).pipe(output);