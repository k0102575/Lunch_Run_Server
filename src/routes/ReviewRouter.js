import express from 'express';
import {
    check,
    validationResult
} from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    reviewService
} from '../service';

const ReviewRouter = express.Router();

ReviewRouter.use('/', authMiddlewareService.isValidToken)
ReviewRouter.use('/:id', authMiddlewareService.isValidToken)

ReviewRouter.get('/', [
    check('restaurant_id').not().isEmpty()
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
        }

        const param = {
            page: req.query.page,
            restaurant_id: req.query.restaurant_id
        }

        const result = await reviewService.getReviewList(param)

        serverService.response(res, 200, result)

    } catch (err) {
        errorService.resError(res, err);
    }

});

ReviewRouter.post('/', [
    check('rating').not().isEmpty(),
    check('restaurant_id').not().isEmpty()
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
        }

        const param = {
            rating: req.body.rating,
            comment: req.body.comment,
            user_id: req.user.id,
            restaurant_id: req.body.restaurant_id
        }

        const result = await reviewService.insertReview(param)

        serverService.response(res, 200, result)

    } catch (err) {
        errorService.resError(res, err);
    }

});

ReviewRouter.put('/', [
    check('rating').not().isEmpty(),
    check('review_id').not().isEmpty()
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
        }

        const param = {
            rating: req.body.rating,
            comment: req.body.comment,
            user_id: req.user.id,
            review_id: req.body.review_id
        }

        const result = await reviewService.updateReview(param)

        serverService.response(res, 200, result)

    } catch (err) {
        errorService.resError(res, err);
    }

});

ReviewRouter.delete('/:id', async (req, res) => {

    try {

        if (req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, 422, {
                "errors": [{
                    "value": "***",
                    "msg": "Invalid value",
                    "param": "id",
                    "location": "Path Variable"
                }]
            })
        }

        const param = {
            review_id: req.params.id,
        }

        const result = await reviewService.deleteReview(param)

        serverService.response(res, 200, result)

    } catch (err) {
        errorService.resError(res, err);
    }

});

export default ReviewRouter;