const addWhereClause = (initSQL, columns, constraint = ' AND ') => {
    if (columns.length) {
        initSQL += ' WHERE '
    }
    const mappedColumns = columns.map((column, i) => `${column} = $${i + 1}`)
    
    return initSQL + mappedColumns.join(`${constraint}`)
}

const addInsertStatement = (initSQL, columns) => {
    const mappedColumns = columns.map((c, i) => `$${i + 1}`)

    return initSQL + '(' + columns + ') ' + 'VALUES(' + mappedColumns + ') RETURNING *;'
}

const addUpdateStatement = (initSQL, columns, condition, conditionParams) => {
    const mappedColumns = columns.map((c, i) => `${c} = $${conditionParams.length + i + 1}`)
    
    let sql = initSQL + ' SET ' + mappedColumns
    if (condition = 'WHERE') {
        const sqlWithWhereClause = addWhereClause(sql, conditionParams)
        sql = sqlWithWhereClause
    }
    return sql + ' RETURNING *;'
}

// console.log(addWhereClause('SELECT * FROM books', ['topic', 'type']))
// console.log(addInsertStatement('INSERT INTO books', ['topic', 'type']))
// console.log(addUpdateStatement('UPDATE books', ['topic', 'type'], ' WHERE ', ['id']))

module.exports = {
    addWhereClause,
    addInsertStatement,
    addUpdateStatement
}