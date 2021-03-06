var pool = require('../model/config/connectDb');

let queryActionSlideDelete = (query, params) => {
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


// get all slider
let getAllSlide = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    return resolve(rows);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}

module.exports = {
    queryActionSlideDelete,
    getAllSlide
}