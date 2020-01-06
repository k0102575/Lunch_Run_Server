import {
    dbService
} from './'

class ReportTypeService {
    constructor() {}

    async getType() {
        const selectQuery = 'select * from report_type'

        const result = await dbService.query(selectQuery)

        return result;
    }
}

export default ReportTypeService