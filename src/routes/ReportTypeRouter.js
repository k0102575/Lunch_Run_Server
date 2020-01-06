import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    reportTypeService
} from '../service';

const ReportTypeRouter = express.Router();

ReportTypeRouter.get('/', async (req, res) => {

    try {
        const result = await reportTypeService.getType()

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, 500, err);
    }

});

export default ReportTypeRouter;