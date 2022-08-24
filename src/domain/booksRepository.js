const db = require("../../db");

const getAllBooks = async (reqQuery) => {
    let sqlQuery = 'SELECT * FROM books'
    const queryParams = []

    if (reqQuery.type) {
        queryParams.push(reqQuery.type)
        sqlQuery += ' WHERE type = $1;'
    }
    if (reqQuery.topic) {
        queryParams.push(reqQuery.topic)
        sqlQuery += ' WHERE topic = $1;'
    }

    return await db.query(sqlQuery, queryParams)
}

module.exports = {
    getAllBooks
}