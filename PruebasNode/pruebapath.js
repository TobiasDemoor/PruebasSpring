const path = require('path');

const myPath = path.basename(__filename);
const myDir = path.basename(__dirname);
console.log(myPath, myDir);

let userName = 'David';
const join = path.join('/users', userName, 'index.html');
console.log(join);