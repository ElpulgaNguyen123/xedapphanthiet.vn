var pool = require('../model/config/connectDb');

let queryAction = (query, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, params, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    reject([]);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}
let queryActionNoParams = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    reject([]);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}

let queryActionNoParamsreturn = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}


let newAttributeVal = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                resolve('Thành công !');
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}
// lấy id cuối cùng của attribute value
let getLastId = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    reject([]);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}
// lấy danh sách id vửa được tạo mới của atrribute value;
let getLastsId = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                console.log(rows[0]);
                if (!rows[0]) {
                    reject([]);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}

let newProduct = (query, items) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, items, function (error, rows, fields) {
                if (error) throw error;
                if (!rows) {
                    reject('Có lỗi xảy ra');
                }
                return resolve('');
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}


let getlastProduct = (query, items) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, items, function (error, rows, fields) {
                if (error) throw error;
                if (!rows) {
                    reject('Có lỗi xảy ra');
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}

module.exports = {
    queryAction,
    queryActionNoParams,
    newProduct,
    getlastProduct,
    getLastId,
    getLastsId,
    newAttributeVal,
    queryActionNoParamsreturn
}