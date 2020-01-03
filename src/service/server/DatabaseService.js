import dbConfig from '../../../config/database'
import mysql from 'mysql2'

class DataBaseService {
    constructor() {
        this.connection = mysql.createPool(dbConfig).promise();
    }

    async query(query, values){
        try{
            if(!!values) values = this.checkValues(values);
            const [res] = await this.connection.execute(query, values);
            //TODO 쿼리 로그 테이블 추가 필요
            return res;
        } catch(err){
            throw new Error(err);
        }
    }

    async bulkQuery(query, values){
        try{
            if(!!values) values = this.checkValues(values);
            const [res] = await this.connection.query(query, [values]);
            return res;
        } catch(err){
            console.error(err);
        }
    }

    checkValues(values){
        for(let i in values){
            if(values[i] === undefined || values[i] === "") values[i] = null;
        }
        if (values.constructor == Object) return Object.values(values)
        return values;
    }
}

export default DataBaseService;