const db = require("../../db");
const { 
    addWhereClause,
    addInsertStatement,
    addUpdateStatement 
} = require("./utils");

const getAllPets = async (reqQuery) => {
    const sqlQuery = addWhereClause('SELECT * FROM pets', Object.keys(reqQuery))

    return await db.query(sqlQuery, Object.values(reqQuery))
}

const createPet = async (reqBody) => {
    const sqlQuery = addInsertStatement('INSERT INTO pets', Object.keys(reqBody))

    return await db.query(sqlQuery, Object.values(reqBody))
}

const updatePet = async (reqBody, reqParams) => {
    const sqlQuery = addUpdateStatement('UPDATE pets', Object.keys(reqBody), 'WHERE', Object.keys(reqParams))
    const valuesParamsArray = Object.values(reqParams).concat(Object.values(reqBody))

    return await db.query(sqlQuery, valuesParamsArray)
}

const deletePet = async (reqParams) => {
    const conditions = addWhereClause('', Object.keys(reqParams))
    const sqlQuery = `
        DELETE FROM pets
        ${conditions}
        RETURNING *
    `;
    const queryParams = [Number(reqParams.id)];
    return await db.query(sqlQuery, queryParams);
}

module.exports = {
    getAllPets,
    createPet,
    updatePet,
    deletePet
}