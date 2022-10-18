"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserReviews = exports.deleteReview = exports.updateReview = exports.getReview = exports.createReview = exports.getAllReviews = void 0;
const book_1 = require("../models/book");
const review_1 = require("../models/review");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllReviews = async (req, res, next) => {
    let reviews = await review_1.Review.findAll({ include: [
            { model: user_1.User, required: true },
            { model: book_1.Book, required: true }
        ],
        order: [['reviewId', 'DESC']] });
    res.status(200).json(reviews);
};
exports.getAllReviews = getAllReviews;
const createReview = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newReview = req.body;
    newReview.userId = user.userId;
    if (newReview.userId
        && newReview.bookId
        && newReview.comment) {
        let created = await review_1.Review.create(newReview);
        res.status(201).json(created);
    }
    else {
        res.status(400).send('Either the userId, bookId, or comment is null');
    }
};
exports.createReview = createReview;
const getReview = async (req, res, next) => {
    let reviewId = req.params.reviewId;
    let foundReview = await review_1.Review.findByPk(reviewId);
    if (foundReview) {
        res.status(200).json(foundReview);
    }
    else {
        res.status(404).json({});
    }
};
exports.getReview = getReview;
const updateReview = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let reviewId = req.params.reviewId;
    let newReview = req.body;
    let foundReview = await review_1.Review.findByPk(reviewId);
    if (foundReview && foundReview.userId == user.userId
        && foundReview.reviewId == newReview.reviewId
        && newReview.comment) {
        await review_1.Review.update(newReview, { where: { reviewId: reviewId } });
        res.status(200).json('success!');
    }
    else {
        res.status(400).json("the userId doesn't match, review can't be found, or the comment is missing");
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let reviewId = req.params.reviewId;
    let foundReview = await review_1.Review.findByPk(reviewId);
    if (foundReview && foundReview.userId == user.userId) {
        await review_1.Review.destroy({ where: { reviewId: reviewId } });
        res.status(200).json('success!');
    }
    else {
        res.status(404).json("review's userId & user's userId don't match or doesn't exist");
    }
    ;
};
exports.deleteReview = deleteReview;
//getAllUserReviews returns all the reviews that match the logged in user's userId
//it has a check to make sure the user is logged in & the user's userId will need
//to be accessed in the frontend - perhaps by storing & accessing in local storage
const getAllUserReviews = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send('user not logged in');
    }
    let foundReviews = await review_1.Review.findAll({ where: { userId: user.userId } });
    res.status(200).json(foundReviews);
};
exports.getAllUserReviews = getAllUserReviews;
