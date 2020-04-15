const db = require('../utils/db');
const tbName = 'products';

module.exports = {
    all: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const rows = await db.load(sql);
        return rows;
    },
    allByCatId: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE catId = ${id}`;
        const rows = await db.load(sql);
        return rows;
    },
    getByProId: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE ProID = ${id}`;
        const rows = await db.load(sql);
        return rows;
    }
}