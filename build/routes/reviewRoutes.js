"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
//GET localhost:3000/api/reviews
router.get('/', reviewController_1.getAllReviews);
//POST localhots:3000/api/review
router.post('/', reviewController_1.createReview);
//GET localhost:3000/api/reviews/:reviewId
router.get('/:reviewId', reviewController_1.getReview);
//PUT localhost:3000/api/reviews/:reviewId
router.put('/:reviewId', reviewController_1.updateReview);
//DELETE localhost:3000/api/reviews/:reviewId
router.delete('/:reviewId', reviewController_1.deleteReview);
exports.default = router;
