var pool = require('../model/config/connectDb');

let queryAction = (query, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, params, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    resolve(rows);
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
                    return resolve(rows);
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

// lấy danh sách thuộc tính của sản phẩm
let getProductAttributes = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
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
// lấy tên của hình ảnh được chọn để cập nhật hoặc thay đổi
let getImageProduct = (query) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw 'Lỗi';
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


// Frontend

let getAllCategoryProduct = (query) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function (error, rows, fields) {
                if (error) throw 'Lỗi';
                if (!rows) {
                    return resolve(rows);
                }
                return resolve(rows);
            })
        } catch (error) {
            console.log('caught', error);
        }
    })
}


// FRONTEND START
let getAllProductFr = (query, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            pool.query(query, params, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                     resolve(rows);
                }
                console.log(rows)
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
    queryActionNoParamsreturn,
    getProductAttributes,

    getImageProduct,
    getAllCategoryProduct,


    getAllProductFr
}