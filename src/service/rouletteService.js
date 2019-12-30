const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    getData : function (callback) {
        try {
            connection.query('SELECT rc.color, r.name from restaurant r inner join restaurant_category rc on rc.id = r.category_id order by rand() limit 12', function (err, result) {
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