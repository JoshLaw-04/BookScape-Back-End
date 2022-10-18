import { RequestHandler } from "express";
import { Book } from "../models/book";
import { Review } from "../models/review";

export const getAllBooks: RequestHandler = async (req, res, next) => {
    let book = await Book.findAll({order: [['updatedAt', 'DESC']]});
    res.status(200).json(book);
};

export const getBook: RequestHandler = async (req, res, next) => {
    let bookId = req.params.bookId;
    let foundBook = await Book.findByPk(bookId);
    if (foundBook) {
        res.status(200).json(foundBook);
    } else {
        res.status(404).json('Book not found by bookId');
    }
};

export const setBook: RequestHandler = async (req, res, next ) => {

    let newBook: Book = req.body.volumeInfo;
    let title = req.body.volumeInfo.title

    let bookFound = await Book.findOne({ where: { title : title } });

    if (bookFound && bookFound.title == newBook.title) {
        await Book.update(newBook, {where: {title: title}})
        res.status(200).json(bookFound);
    } else if (!bookFound) {
        let createdBook = await Book.create(newBook);
        res.status(201).json(createdBook);
    } else {
        res.status(400).json('Error saving new book to DB & no book found with that title');
    }
}