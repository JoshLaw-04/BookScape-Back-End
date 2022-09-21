import { RequestHandler } from "express";
import { Review } from "../models/review";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllReviews: RequestHandler = async (req,res,next) => {
    let reviews = await Review.findAll( {include: [{
                                                model: User, 
                                                required: true}],
                                                order: [['reviewId', 'DESC']]});
    res.status(200).json(reviews);
};

export const createReview: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newReview: Review = req.body;
    newReview.userId = user.userId;

    if (newReview.comment) {
        let created = await Review.create(newReview);
        res.status(201).json(created)
    } else {
        res.status(400).send('Please add a comment');
    }
};

export const getReview: RequestHandler = async (req, res, next) => {
    let reviewId = req.params.reviewId;
    let foundReview = await Review.findByPk(reviewId);
    if (foundReview) {
        res.status(200).json(foundReview);
    } else {
        res.status(404).json({});
    }
};

export const updateReview: RequestHandler = async (req, res, next) => {
    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let reviewId = req.params.reviewId;
    let newReview: Review = req.body;
    let foundReview = await Review.findByPk(reviewId);

    if (foundReview && foundReview.userId == user.userId
        && foundReview.reviewId == newReview.reviewId
        && newReview.comment) {
            await Review.update(newReview, {where: {reviewId: reviewId}});
            res.status(200).json('success!');
        } else {
            res.status(400).json("the userId doesn't match, review can't be found, or the comment is missing");
        }
};

export const deleteReview: RequestHandler = async (req, res, next) => {
    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let reviewId = req.params.reviewId;
    let foundReview = await Review.findByPk(reviewId);

    if (foundReview && foundReview.userId == user.userId) {
        await Review.destroy({where: {reviewId : reviewId}});
        res.status(200).json('success!');
    } else {
        res.status(404).json("review's userId & user's userId don't match or doesn't exist")
    };
};





