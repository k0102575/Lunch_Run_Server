import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class RestaurantReportService {
    constructor() {}

    async getReportList(param) {

        try {
            const {page, user_id} = param
            let row = (page != undefined) ? page : 0

            const selectQuery = 'SELECT rr.id, rt.id as reportType, rt.name as reportText, r.name as restrauntName, r.address_road as restaurantAddress\
            FROM restaurant_report rr\
            INNER JOIN report_type rt on rr.type_id = rt.id\
            INNER JOIN restaurant r on rr.restaurant_id = r.id\
            WHERE rr.delete_datetime is null\
            AND rr.user_id = ?\
            limit ? , 10'

            const result = await dbService.query(selectQuery, [user_id, (row * 10)])

            return result;
            
        } catch(err) {
            throw new ServerError(err.message, 500)
        }

    }

    async getReport(param) {

        try {
            const {id} = param

            const selectQuery = 'SELECT rr.id, rr.content, rt.id as reportType, rt.name as reportText\
                                FROM restaurant_report rr\
                                INNER JOIN report_type rt on rr.type_id = rt.id where rr.id = ?'

            const result = await dbService.query(selectQuery, [id])

            return result;
            
        } catch(err) {
            throw new ServerError(err.message, 500)
        }

    }

    async insertReport(param) {

        try {
            const {content, user_id, restaurant_id, type_id} = param

            const insertQuery = 'INSERT INTO restaurant_report (content, user_id, restaurant_id, type_id)\
                            VALUES\
                            (?, ?, ?, ?)'

            const result = await dbService.query(insertQuery, [content, user_id, restaurant_id, type_id])

            return result.insertId;
            
        } catch(err) {
            throw new ServerError(err.message, 500)
        }

    }

    async updateReport(param) {

        try {
            const {content, type_id, id} = param

            const updateQuery = 'UPDATE restaurant_report SET content = ?, type_id = ? where id = ?'

            const result = await dbService.query(updateQuery, [content, type_id, id])

            return id;
            
        } catch(err) {
            throw new ServerError(err.message, 500)
        }

    }

    async deleteReport(param) {

        try {
            const {id} = param

            const deleteQuery = 'update restaurant_report SET delete_datetime = now() where id = ?'

            await dbService.query(deleteQuery, [id])

            return id;
            
        } catch(err) {
            throw new ServerError(err.message, 500)
        }

    }

}

export default RestaurantReportService