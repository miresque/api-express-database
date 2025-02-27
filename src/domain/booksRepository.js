const db = require("../../db");
const { 
    addWhereClause,
    addInsertStatement,
    addUpdateStatement 
} = require("./utils");

const getAllBooks = async (reqQuery) => {
    const sqlQuery = addWhereClause('SELECT * FROM books', Object.keys(reqQuery))

    return await db.query(sqlQuery, Object.values(reqQuery))
}

const createBook = async (reqBody) => {
    const sqlQuery = addInsertStatement('INSERT INTO books', Object.keys(reqBody))

    return await db.query(sqlQuery, Object.values(reqBody))
}

const updateBook = async (reqBody, reqParams) => {
    const sqlQuery = addUpdateStatement('UPDATE books', Object.keys(reqBody), 'WHERE', Object.keys(reqParams))
    const valuesParamsArray = Object.values(reqParams).concat(Object.values(reqBody))

    return await db.query(sqlQuery, valuesParamsArray)
}

const deleteBook = async (reqParams) => {
    const conditions = addWhereClause('', Object.keys(reqParams))
    const sqlQuery = `
        DELETE FROM books
        ${conditions}
        RETURNING *
    `;
    const queryParams = [Number(reqParams.id)];
    return await db.query(sqlQuery, queryParams);
}

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}