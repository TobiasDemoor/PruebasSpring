const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Code = require('../models/code');

router.get('/user/:userID', (req, res, next) => {
    const id = req.params.userID;
    Code.find({user: id}, (err, codes) => {
        if (err) throw err;

        res.status(200).json({
            codes
        });
    }); 
});

router.get('/:codeID', (req, res, next) => {
    const id = req.params.codeID;
    Code.findById(id, (err, code) => {
        if (err) throw err;

        res.status(200).json({
            message: 'GET a code with Id',
            code
        });
    })
});

router.get('/', (req, res, next) => {
    Code.find((err, codes) => {
        if (err) throw err;

        res.status(200).json({
            message: 'Handling GET request of the /codes',
            codes
        });
    })
});

router.post('/', (req, res, next) => {
    const code = new Code({
        _id: mongoose.Types.ObjectId(),
        language: req.body.language,
        body: req.body.body,
        user: req.body.user
    });
    code.save((err) => {
        if (err) throw err;

        res.status(201).json({
            message: 'Handling POST request of the /codes',
            code
        });
    })
});

router.patch('/:codeID', (res, req, next) => {
    const id = req.params.codeID;
    const code = {...req.body};
    Code.updateOne({_id:id}, code, (err, raw) =>{
        if (err) throw err;

        res.status(200).json({
            message: 'Code Updated'
        });
    });
})

router.delete('/:codeID', (res, req, next) => {
    const id = req.params.codeID;
    Code.deleteOne({_id:id}, (err) => {
        if (err) throw err;

        res.status(200).json({
            message: 'Code Deleted'
        });
    })
})

module.exports = router;