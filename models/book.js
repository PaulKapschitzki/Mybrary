const mongoose = require('mongoose');

const multerImageBasePath = 'uploads/bookCovers';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // References another object; the ID of another mongoose object (author) in the collection
        required: true,
        ref: 'Author' // same as what is exported from author model
    }
});

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = multerImageBasePath; // export it as a named variable