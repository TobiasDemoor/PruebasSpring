const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request of the /codes'
    });
});

router.post('/', (req, res, next) => {
    const code = {
        language: req.body.language,
        data: req.body.data
    }
    res.status(201).json({
        message: 'Handling POST request of the /codes',
        code
    });
});

router.get('/:codeID', (req, res, next) => {
    const id = req.params.codeID;
    res.status(200).json({
        message: 'GET a code with Id',
        ID: id
    });
});

router.patch('/:codeID', (res, req, next) => {
    const id = req.params.codeID;
    res.status(200).json({
        message: 'Code Updated'
    });
})

router.delete('/:codeID', (res, req, next) => {
    const id = req.params.codeID;
    res.status(200).json({
        message: 'Code Deleted'
    });
})

module.exports = router;