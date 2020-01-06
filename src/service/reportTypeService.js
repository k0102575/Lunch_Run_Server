import {
    dbService
} from './'

import {
    ServerError
} from '../models/ServerError'

class ReportTypeService {
    constructor() {}

    async getType() {

        try {
            const selectQuery = 'select * from report_type'

            const result = await dbService.query(selectQuery)
    
            return result;
        } catch (err) {
            throw new ServerError(err.message, 500);
        }

    }
}

export default ReportTypeService