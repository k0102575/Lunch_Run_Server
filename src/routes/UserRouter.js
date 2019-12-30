import express from 'express';
const UserRouter = express.Router();
const userService = require('../service/userService.js');

UserRouter.get('/', function(req, res, next) {
    userService.getUser(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    });
});

export default UserRouter;