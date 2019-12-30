import express from 'express';
import reportTypeService from '../service/reportTypeService'

const ReportTypeRouter = express.Router();

ReportTypeRouter.get('/', function(req, res, next) {

    reportTypeService.getType(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

export default ReportTypeRouter;