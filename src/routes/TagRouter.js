import express from 'express';

const TagRouter = express.Router();
const tagService = require('../service/tagService.js');

TagRouter.get('/', function(req, res, next) {

    tagService.getCategory(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

export default TagRouter;