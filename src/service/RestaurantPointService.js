import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class RestaurantPointService {
    constructor() {}

    async getRestaurantPoint(param) {
        try {

            const {category_id, tag_id} = param
            let where = ""
            if(category_id != undefined) {
                where = " and category_id = " + category_id
            }

            if(tag_id != undefined) {
                where = " and tag_id = " + tag_id
            }

            const query = 'select r.id, r.lat, r.lng, r.category_id, rc.color\
                            from restaurant r\
                            left join restaurant_tag rt on r.id = rt.restaurant_id\
                            inner join restaurant_category rc on r.category_id = rc.id\
                            where delete_datetime is null \
                            '+where+'\
                            group by r.id'

            const result = await dbService.query(query)

            return result;

        } catch (err) {
            throw new ServerError(err.message, 500);
        }
    }
}

export default RestaurantPointService