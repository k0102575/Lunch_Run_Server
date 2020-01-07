import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class RestaurantFavoriteService {
    constructor() {}

    async getRestaurantFavoriteList(param) {
        try {
            const {user_id, page} = param
            let row = (page != undefined) ? page : 0

            const selectQuery = 'select r.id, r.name, r.floor, r.url, r.lat, r.lng, r.address, r.address_road, r.category_id,\
                                ifnull(round((select avg(rating) from review re where re.restaurant_id = r.id ),1), 0) as rating,\
                                ifnull((select count(*) from restaurant_favorite rf where rf.restaurant_id = r.id and rf.user_id = ? ), 0) as favorite,\
                                group_concat(t.name) as tag\
                                from restaurant r\
                                inner join restaurant_favorite rf on r.id = rf.restaurant_id\
                                left join restaurant_tag rt on r.id = rt.restaurant_id\
                                left join tag t on rt.tag_id = t.id\
                                where rf.user_id = ?\
                                group by r.id limit ' + (row * 10) + ' ,10'
    
            const data = await dbService.query(selectQuery, [user_id, user_id])
    
            return data;
        } catch (err) {
            throw new ServerError(err.message, 500);
        }
    }

    async insertRestaurantFavorite(param) {

        try {

            const {id, user_id} = param

            const insertQuery = 'INSERT INTO restaurant_favorite (user_id, restaurant_id) VALUES(?, ?)'

            const result = await dbService.query(insertQuery, [user_id, id])

            return result.insertId
        } catch (err) {
            throw new ServerError(err.message, 500);
        }

    }

    async deleteRestaurantFavorite(param) {
        try {
            const {id} = param
            const deleteQuery = 'delete from restaurant_favorite where id = ?';

            const data = await dbService.query(deleteQuery, [id])
            return data
        } catch (err) {
            throw new ServerError(err.message, 500);
        }
    }

}

export default RestaurantFavoriteService;