import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class TagService {
    constructor() {}

    async getCategory() {

        try {
            const selectQuery = 'select * from tag';

            const result = await dbService.query(selectQuery);

            return result;
        } catch (err) {
            throw new ServerError(err.message, 500)
        }

    }
}

export default TagService