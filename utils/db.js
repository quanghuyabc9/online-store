const mysql = require('mysql');

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'qlbh'
    });
}

// module.exports = {
//     load: sql => {
//         return new Promise((resolve, reject) => {
//             const con = createConnection();
//             con.connect(err => {
//                 if (err) {
//                     reject(err);
//                 }
//             });
//             con.query(sql, (error, results, fields) => {
//                 if (error) {
//                     reject(error);
//                 }               
//                 resolve(results);
//             });
//             con.end();
//         });
//     }
// }

exports.load = sql => {
    return new Promise((resolve, reject) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                reject(err);
            }
        });
        con.query(sql, (error, results, fields) => {
            if(error) {
                reject(error);
            }
            resolve(results);
        });
        con.end();
    });
};