const db = require('../utils/db');
const tbName = 'categories';

module.exports = {
    all: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const rows = await db.load(sql);
        return rows;
    }
}