const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    getType : function (callback) {
        try {
            connection.query('select * from report_type', function (err, result) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            })    
        } catch(e) {
            callback(err, null);
        }
    }
}