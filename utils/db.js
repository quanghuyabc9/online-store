const mysql = require('mysql');

function createConnection() {
    return mysql.createConnection({
        host: 'sql9.freemysqlhosting.net',
        port: '3306',
        user: 'rootsql9333634',
        password: 'BlhTu4RBiD',
        database: 'sql9333634'
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