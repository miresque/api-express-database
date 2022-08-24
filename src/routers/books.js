const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, updateBook, deleteBook } = require("../domain/booksRepository");

router.get('/', async (req, res) => {
    const allBooks = await getAllBooks(req.query)

    res.status(200).json({
        books: allBooks.rows
    })
});

router.post('/', async (req, res) => {
    const newBook = await createBook(req.body)

    res.status(201).json({
        book: newBook.rows[0]
    })
});

router.get('/:id', async (req, res) => {
    const bookByID = await getAllBooks(req.params)

    res.status(200).json({
        book: bookByID.rows[0]
    })
});

router.put('/:id', async (req, res) => {
    const queryData = await updateBook(req.body, req.params)

    res.status(201).json({
        book: queryData.rows[0]
    })
});

router.delete('/:id', async (req, res) => {
    const queryData = await deleteBook(req.params);

    res.status(201).json({
        book: queryData.rows[0]
    })
});

module.exports = router
