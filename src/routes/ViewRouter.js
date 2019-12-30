import express from 'express';
import kakao from "../../config/kakao.js";

const ViewRouter = express.Router();

ViewRouter.get('/', function(req, res, next) {
    res.render('index', {kakao: kakao});
});

export default ViewRouter;