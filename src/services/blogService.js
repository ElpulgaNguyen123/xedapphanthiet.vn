var pool = require('../model/config/connectDb');

let queryActionBlogelete = (query, params) => {
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


let getAllBlog = (query) => {
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


let getBlog = (query, param) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, param, function (error, rows, fields) {
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
    queryActionBlogelete,
    getAllBlog,
    getBlog
}