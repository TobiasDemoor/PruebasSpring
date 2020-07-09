const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./api/routes/users');
const codesRoutes = require('./api/routes/codes');
const app = express();

mongoose.connect('mongodb://192.168.1.110:27017/pruebadb', { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('Successfully connected to .');
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        return res.status(200).json();
    } else {
        return next();
    }
});

app.use('/users', usersRoutes);
app.use('/codes', codesRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        error
    });
})

module.exports = app;