const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    getCategory : function (callback) {
        try {
            connection.query('select * from tag', function (err, result) {
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