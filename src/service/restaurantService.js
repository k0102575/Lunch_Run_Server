import {
    dbService
} from './'

class RestaurantService {
    constructor() {}

    async getRestaurantList(param) {
        try {
            const {
                page,
                user_id,
                category_id,
                tag_id
            } = param
            let categoryWhere = ''
            let tagWhere = ''
            if (category_id != undefined) {
                categoryWhere += ' and category_id = ' + category_id
            }
            if (tag_id != undefined) {
                tagWhere += 'inner join (\
                    select sr.id\
                    from restaurant sr \
                    inner join restaurant_tag rt on sr.id = rt.restaurant_id\
                    where rt.tag_id = ' + tag_id + '\
                ) as sur on sur.id = r.id'
            }

            let row = (page != undefined) ? page : 0

            const data = dbService.query('select r.id, r.name, r.floor, r.url, r.lat, r.lng, r.address, r.address_road, r.category_id, \
            ifnull(round((select avg(rating) from review re where re.restaurant_id = r.id ),1), 0) as rating,\
            ifnull((select count(*) from restaurant_favorite rf where rf.restaurant_id = r.id and rf.user_id = ' + user_id + '), 0) as favorite,\
            group_concat(t.name) as tag\
            from restaurant r\
            left join restaurant_tag rt on r.id = rt.restaurant_id\
            left join tag t on rt.tag_id = t.id\
            ' + tagWhere + '\
            where r.delete_datetime is null ' + categoryWhere + '\
            group by r.id limit ' + (row * 10) + ' ,10')

            return data;
        } catch (err) {
            throw new Error(err);
        }
    }

    async insertRestaurant(param) {
        try {

            const {name, floor, url, lat, lng, address, address_road, category_id, tags} = param

            const query = 'insert into restaurant (name, floor, url, lat, lng, address, address_road, category_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'

            const result = await dbService.query(query, [name, floor, url, lat, lng, address, address_road, category_id])
            const restaurantId = result.insertId

            if(tags.length != 0) {

                let tag_multiple_query = 'insert into restaurant_tag (tag_id, restaurant_id) VALUES ?';
                let values = [];

                let tagArray = tags.split(",")

                for (var i = 0; i < tagArray.length; i++) {
                    values.push([tagArray[i].toString(), restaurantId.toString()])
                }

                await dbService.bulkQuery(tag_multiple_query, values)
            }
            
            return restaurantId
        } catch (err) {
            throw new Error(err);
        }
    }

    async getRestaurant(param) {

        try {

            const query = 'select r.id, r.name, r.floor, r.url, r.lat, r.lng, r.address, r.address_road, r.category_id, \
            ifnull(round((select avg(rating) from review re where re.restaurant_id = r.id ),1), 0) as rating,\
            ifnull((select count(*) from restaurant_favorite rf where rf.restaurant_id = r.id and rf.user_id = ? ), 0) as favorite,\
            group_concat(t.name) as tag\
            from restaurant r\
            left join restaurant_tag rt on r.id = rt.restaurant_id\
            left join tag t on rt.tag_id = t.id\
            where r.id = ?'

            const data = await dbService.query(query, param)
            return data
        } catch (err) {
            throw new Error(err);
        }

    }

    async deleteRestaurant(param) {

        try {
            const query = 'update restaurant SET delete_datetime = now() where id = ?';
            const values = [param.id];

            const data = await dbService.query(query, values)
            return data
        } catch (err) {
            throw new Error(err);
        }

    }

}

export default RestaurantService;

// module.exports = {
//     getRestaurantPoint: function (param, callback) {

//         const {category_id, tag_id} = param
//         let where = ""
//         if(category_id != undefined) {
//             where = " and category_id = " + category_id
//         }

//         if(tag_id != undefined) {
//             where = " and tag_id = " + tag_id
//         }

//         connection.query('select r.id, r.lat, r.lng, r.category_id, rc.color\
//                         from restaurant r\
//                         left join restaurant_tag rt on r.id = rt.restaurant_id\
//                         inner join restaurant_category rc on r.category_id = rc.id\
//                         where delete_datetime is null \
//                         '+where+'\
//                         group by r.id', where, function(err, rows, fields){

//             if(err){
//                 callback(500, err.message, null);
//             } else {
//                 callback(null, null, rows);
//             }
//         });

//     },
//     insertRestaurant : function (param, callback) {
//         try {
//             const {name, floor, url, lat, lng, address, address_road, category_id, tags} = param
//             let restaurantId = 0;

//             async.waterfall([
//                 function(callback) {
//                     connection.query(' function(err, rows, fields){
//                         if(err){
//                             callback(err, null);
//                         } else {
//                             restaurantId = rows.insertId
//                             callback(null, rows.insertId);
//                         }
//                     });
//                 },
//                 function(restaurantId, callback) {

//                     if(tags.length != 0) {

//                         let tag_multiple_query = 'insert into `restaurant_tag` (`tag_id`, `restaurant_id`) values ? ';
//                         let values = [];

//                         for (var i = 0; i < tags.length; i++) {
//                             values.push([tags[i].toString(), restaurantId.toString()])
//                         }

//                         connection.query(tag_multiple_query, [values], function(err, rows, fields){
//                             if(err){
//                                 callback(err, null);
//                             } else {
//                                 callback(null, restaurantId);
//                             }
//                         });

//                     } else {
//                         callback(null, restaurantId);
//                     }

//                 }
//             ], function (err, restaurantId) {
//                 if(err) {
//                     callback(500, err.message, null);
//                 } else {
//                     callback(200, null, restaurantId)
//                 }
//             });

//         } catch(err) {
//             callback(500, err.message, null);
//         }

//     },
//     updateRestaurant : function (param, callback) {
//         try {
//             const {id, name, floor, url, lat, lng, address, address_road, category_id, tags} = param

//             async.waterfall([
//                 function(callback) {
//                     connection.query('update restaurant SET name = ?, floor = ?, url = ?, lat = ?, lng =?, address = ?, address_road = ?, category_id = ? where id = ?', [name, floor, url, lat, lng, address, address_road, category_id, id], function(err, rows, fields){
//                         if(err){
//                             callback(err, null);
//                         } else {
//                             callback(null, id);
//                         }
//                     });
//                 },
//                 function(id, callback) {

//                     connection.query('delete from restaurant_tag where restaurant_id = ?', id, function(err, rows, fields){
//                         if(err){
//                             callback(err, null);
//                         } else {
//                             callback(null, id);
//                         }
//                     });

//                 },
//                 function(id, callback) {

//                     if(tags.length != 0) {

//                         let tag_multiple_query = 'insert into `restaurant_tag` (`tag_id`, `restaurant_id`) values ? ';
//                         let values = [];

//                         for (var i = 0; i < tags.length; i++) {
//                             values.push([tags[i].toString(), id.toString()])
//                         }

//                         connection.query(tag_multiple_query, [values], function(err, rows, fields){
//                             if(err){
//                                 callback(err, null);
//                             } else {
//                                 callback(null, id);
//                             }
//                         });

//                     } else {
//                         callback(null, id);
//                     }

//                 }
//             ], function (err, id) {
//                 if(err) {
//                     callback(500, err.message, null);
//                 } else {
//                     callback(200, null, id)
//                 }
//             });

//         } catch(err) {
//             callback(500, err.message, null);
//         }
//     },
// }