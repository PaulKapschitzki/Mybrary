const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const Author = require('../models/author');
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype)); // first parameter is a error parameter
    }
});

// All Books Route
router.get('/', async (req, res) => {
    res.send('All Books');
});

// New Book Route
router.get('/new', async (req, res) => {
    // res.send('New Book');
    const authors = await Author.find({});
    const book = new Book();
    try {
        res.render('books/new', {
            authors: authors,
            book: book
        });
    } catch {
        res.redirect('/books');
    }
});

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {
    // res.send('Create Book');
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDat: new Date(req.body.publishDat),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
});

module.exports = router;