import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class RestaurantCategoryService {
    constructor() {}

    async getCategory() {

        try {

            const selectQuery = 'select * from restaurant_category';

            const result = await dbService.query(selectQuery)

            return result;
        } catch (err) {
            throw new ServerError(err.message, 500);
        }

    }
}

export default RestaurantCategoryService;