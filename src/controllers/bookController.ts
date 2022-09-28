import { RequestHandler } from "express";
import { Book } from "../models/book";
import { Review } from "../models/review";

/* Please review and let me know before I test this.  I am not 
sure about any of this, but it is a start */

export const getBook: RequestHandler = async (req, res, next) => {
    let book = await Book.findAll( {include: [{
                                                model: Review, 
                                                required: true}]});
    res.status(200).json(book);
};

export const setBook: RequestHandler = async (req, res, next ) => {
    let volumeId = req.params.volumeId;
    let newBook: Book = req.body;

    let bookFound = await Book.findByPk(volumeId);
    /* trying to test if the book by volumeId exists before 
    creating new */
    if (bookFound && bookFound.volumeId == newBook.volumeId) {
        await Book.update(newBook, {
            where: { volumeId: volumeId }
        });
        res.status(200).json();
    } else if (bookFound && bookFound.volumeId != newBook.volumeId) {
        let created = await Book.create(newBook);
        res.status(201).json(created);
    } else {
        res.status(400).json();
    }
}