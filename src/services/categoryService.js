var pool = require('../model/config/connectDb');

let queryActionCategoryDelete = (query, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, params, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    reject([]);
                }
                return resolve(rows[0].image);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}

module.exports = {
    queryActionCategoryDelete
}