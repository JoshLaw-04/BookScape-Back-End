import { RequestHandler } from "express";
import { Book } from "../models/book";
import { Review } from "../models/review";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllReviews: RequestHandler = async (req,res,next) => {
    let reviews = await Review.findAll( {include: [
                                                 {model: User, required: true},
                                                 {model: Book, required: true}
                                                ],
                                                order: [['reviewId', 'DESC']]});
    res.status(200).json(reviews);
};

export const createReview: RequestHandler = async (req, res, next) => {

    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send('Please log in or sign up to create a review');
    }

    let newReview: Review = req.body;
    newReview.userId = user.userId;

    if (newReview.userId
        && newReview.bookId
        && newReview.comment) {
        let created = await Review.create(newReview);
        res.status(201).json(created)
    } else {
        res.status(400).send('Either the userId, bookId, or comment is null');
    }
};

export const getReview: RequestHandler = async (req, res, next) => {
    let reviewId = req.params.reviewId;
    let foundReview = await Review.findByPk(reviewId);
    if (foundReview) {
        res.status(200).json(foundReview);
    } else {
        res.status(404).json('Review not found by reviewId');
    }
};

export const updateReview: RequestHandler = async (req, res, next) => {
    
    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send('Please log in to update the review');
    }

    let reviewId = req.params.reviewId;
    let newReview: Review = req.body;
    let foundReview = await Review.findByPk(reviewId);

    if (foundReview && foundReview.userId == user.userId
        && foundReview.reviewId == newReview.reviewId
        && newReview.comment
        && newReview.bookId) {
            await Review.update(newReview, {where: {reviewId: reviewId}});
            res.status(200).json('Review updated!');
        } else {
            res.status(400).json("The userId doesn't match, review can't be found, or the bookId/comment is missing");
        }
};

export const deleteReview: RequestHandler = async (req, res, next) => {

    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send('Please log in to delete a review');
    }

    let reviewId = req.params.reviewId;
    let foundReview = await Review.findByPk(reviewId);

    if (foundReview && foundReview.userId == user.userId) {
        await Review.destroy({where: {reviewId : reviewId}});
        res.status(200).json('Review deleted!');
    } else {
        res.status(404).json("Review's userId & user's userId don't match or doesn't exist")
    };
};

export const getAllUserReviews: RequestHandler = async (req,res,next) => {
    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send('Please log in to view all of your reviews')
    }

    let foundReviews = await Review.findAll({ where: { userId: user.userId}});
    res.status(200).json(foundReviews);
};



