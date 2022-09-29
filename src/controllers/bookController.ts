import { RequestHandler } from "express";
import { Book } from "../models/book";
import { Review } from "../models/review";

export const getAllBooks: RequestHandler = async (req, res, next) => {
    let book = await Book.findAll( {include: [{
                                                model: Review, 
                                                required: true}]});
    res.status(200).json(book);
};

export const getBook: RequestHandler = async (req, res, next) => {
    let bookId = req.params.bookId;
    let foundBook = await Review.findByPk(bookId);
    if (foundBook) {
        res.status(200).json(foundBook);
    } else {
        res.status(404).json({});
    }
};

export const setBook: RequestHandler = async (req, res, next ) => {

    let newBook: Book = req.body;
    let volumeId = req.body.volumeId

    let bookFound = await Book.findOne({ where: { volumeId : volumeId} });

    if (bookFound && bookFound.volumeId == newBook.volumeId) {
        await Book.update(newBook, {where: {volumeId: volumeId}})
        res.status(200).json('updated');
    } else if (!bookFound) {
        console.log(newBook)
        let createdBook = await Book.create(newBook);
        res.status(201).json(createdBook);
    } else {
        res.status(400).json();
    }
}