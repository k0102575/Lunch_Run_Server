import express from 'express';

import {
    authMiddlewareService,
    errorService,
    serverService,
    tagService
} from '../service';

const TagRouter = express.Router();

TagRouter.get('/', async (req, res) => {

    try {
        const result = await tagService.getCategory();

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, err)
    }
    
});

export default TagRouter;