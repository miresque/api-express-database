const addWhereClause = (initSQL, columns, constraint = ' AND ') => {
    if (columns.length) {
        initSQL += ' WHERE '
    }
    const mappedColumns = columns.map((column, i) => `${column} = $${i + 1}`)
    
    return initSQL + mappedColumns.join(`${constraint}`)
}

// console.log(addWhereClause('SELECT * FROM books', ['topic', 'type']))

module.exports = {
    addWhereClause
}