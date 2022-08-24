const express = require('express')
const router = express.Router()
const db = require("../../db");
const { getAllBooks, createBook, updateBook } = require("../domain/booksRepository")

router.get('/', async (req, res) => {
    const allBooks = await getAllBooks(req.query)

    res.status(200).json({
        books: allBooks.rows
    })
})

router.post('/', async (req, res) => {
    const newBook = await createBook(req.body)

    res.status(201).json({
        book: newBook.rows[0]
    })
})

router.get('/:id', async (req, res) => {
    const bookByID = await getAllBooks(req.params)

    res.status(200).json({
        book: bookByID.rows[0]
    })
})

router.put('/:id', async (req, res) => {
    const queryData = await updateBook(req.body, req.params)
    
    res.status(201).json({
        book: queryData.rows[0]
    });
})

router.delete('/:id', async (req, res) => {
    let sqlQuery = `
        DELETE FROM books 
        WHERE id = $1
        RETURNING *
    `;
    const queryParams = [Number(req.params.id)];
    const queryData = await db.query(sqlQuery, queryParams);
    res.status(201).json({
        book: queryData.rows[0]
    });
})

module.exports = router
