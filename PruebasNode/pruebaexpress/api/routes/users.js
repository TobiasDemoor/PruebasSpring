const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.findById(id, (err, user) =>{
        if (err) throw err;

        if (id === 'admin') {
            res.status(200).json({
                message: 'You are the Admin!',
                user
            });
        } else {
            res.status(200).json({
                message: 'You are a standard user',
                user
            });
        }
    });
});

router.get('/', (req, res, next) => {
    User.find((err, users) => {
        if (err) throw err;
        
        res.status(200).json({
            message: 'Handling GET request of the /users',
            users
        });
    })
});

router.post('/', (req, res, next) => {
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country
    });
    user.save((err) => {
        if(err) throw err;

        res.status(201).json({
            message: 'Handling POST request of the /users',
            user
        });
    });
});

router.patch('/:userID', (req, res, next) => {
    const id = req.params.userID;
    const user = {...req.body};
    console.log(user);
    User.updateOne({_id: id}, user, (err, raw) => {
        if (err) throw err;

        res.status(200).json({
            message: 'User updated!'
        });
    });
});

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.deleteOne({_id: id}, (err) => {
        if (err) throw err;

        res.status(200).json({
            message: 'User Deleted!'
        });
    })
});

module.exports = router;