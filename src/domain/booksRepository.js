const db = require("../../db");
const { addWhereClause } = require("./utils");

const getAllBooks = async (reqQuery) => {
    const sqlQuery = addWhereClause('SELECT * FROM books', Object.keys(reqQuery))

    return await db.query(sqlQuery, Object.values(reqQuery))
}

module.exports = {
    getAllBooks
}