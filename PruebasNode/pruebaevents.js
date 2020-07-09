const {EventEmitter} = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('test', (n) => {
    console.log('test ocurred',n);
});
eventEmitter.emit('test', 10);