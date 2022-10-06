"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBook = exports.getBook = exports.getAllBooks = void 0;
const book_1 = require("../models/book");
const getAllBooks = async (req, res, next) => {
    let book = await book_1.Book.findAll();
    res.status(200).json(book);
};
exports.getAllBooks = getAllBooks;
const getBook = async (req, res, next) => {
    let bookId = req.params.bookId;
    let foundBook = await book_1.Book.findByPk(bookId);
    if (foundBook) {
        res.status(200).json(foundBook);
    }
    else {
        res.status(404).json({});
    }
};
exports.getBook = getBook;
const setBook = async (req, res, next) => {
    let newBook = req.body.volumeInfo;
    let title = req.body.volumeInfo.title;
    let bookFound = await book_1.Book.findOne({ where: { title: title } });
    if (bookFound && bookFound.title == newBook.title) {
        await book_1.Book.update(newBook, { where: { title: title } });
        res.status(200).json('updated');
    }
    else if (!bookFound) {
        let createdBook = await book_1.Book.create(newBook);
        res.status(201).json(createdBook);
    }
    else {
        res.status(400).json();
    }
};
exports.setBook = setBook;
