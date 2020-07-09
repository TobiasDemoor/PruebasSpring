const fs = require('fs');
let file = fs.createWriteStream('./big-file.txt');

for (let i = 0; i < 1e6; i++) file.write('esto es texto de relleno\n');

file.on('close', () => console.log('OnClose'));
file.on('finish', () => {
    console.log('OnFinish');
    fContinue();
});

file.end(() => console.log('end'));

function fContinue() {
    file = fs.createReadStream('./big-file.txt');
    
    file.on('data', (chunk) => console.log(`Recieved ${chunk.length} bytes of data`));    
    file.on('end', () => console.log('There is no more data'));
}
