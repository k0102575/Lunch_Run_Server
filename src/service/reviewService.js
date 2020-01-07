import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class ReviewService {
    constructor() {}

    async getReviewList(param) {

        try {
            const {
                restaurant_id,
                page
            } = param
            let row = (page != undefined) ? page : 0

            const selectQuery = 'select * from review where delete_datetime is null and restaurant_id = ? limit ? , 10'

            const result = await dbService.query(selectQuery, [restaurant_id, row]);

            return result;
        } catch (err) {
            throw new ServerError(err.message, 500)
        }

    }

    async insertReview(param) {

        try {
            const {
                rating,
                comment,
                user_id,
                restaurant_id
            } = param;

            const insertQuery = 'INSERT INTO review (create_datetime, delete_datetime, rating, comment, user_id, restaurant_id) VALUES (now(), NULL, ?, ?, ?, ?)';

            const result = await dbService.query(insertQuery, [rating, comment, user_id, restaurant_id])

            return result.insertId;
        } catch (err) {
            throw new ServerError(err.message, 500)
        }

    }

    async updateReview(param) {

        try {
            const {
                rating,
                comment,
                review_id
            } = param

            const updateQuery = 'update review SET rating = ?, comment = ? where id = ?';

            const result = await dbService.query(updateQuery, [rating, comment, review_id])

            return review_id;
        } catch (err) {
            throw new ServerError(err.message, 500)
        }

    }


    async deleteReview(param) {
        try {
            const {
                review_id
            } = param

            const deleteQuery = 'update review SET delete_datetime = now() where id = ?';

            const result = await dbService.query(deleteQuery, [review_id])

            return result;
        } catch (err) {
            throw new ServerError(err.message, 500)
        }
    }

}

export default ReviewService;