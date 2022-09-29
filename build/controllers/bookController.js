"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBook = exports.getBook = exports.getAllBooks = void 0;
const book_1 = require("../models/book");
const review_1 = require("../models/review");
const getAllBooks = async (req, res, next) => {
    let book = await book_1.Book.findAll({ include: [{
                model: review_1.Review,
                required: true
            }] });
    res.status(200).json(book);
};
exports.getAllBooks = getAllBooks;
const getBook = async (req, res, next) => {
    let bookId = req.params.bookId;
    let foundBook = await review_1.Review.findByPk(bookId);
    if (foundBook) {
        res.status(200).json(foundBook);
    }
    else {
        res.status(404).json({});
    }
};
exports.getBook = getBook;
const setBook = async (req, res, next) => {
    let newBook = req.body;
    let volumeId = req.body.volumeId;
    let bookFound = await book_1.Book.findOne({ where: { volumeId: volumeId } });
    if (bookFound && bookFound.volumeId == newBook.volumeId) {
        await book_1.Book.update(newBook, { where: { volumeId: volumeId } });
        res.status(200).json('updated');
    }
    else if (!bookFound) {
        console.log(newBook);
        let createdBook = await book_1.Book.create(newBook);
        res.status(201).json(createdBook);
    }
    else {
        res.status(400).json();
    }
};
exports.setBook = setBook;
