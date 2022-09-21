import { Router } from 'express';
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from '../controllers/reviewController';

const router = Router();

//GET localhost:3000/api/reviews
router.get('/', getAllReviews);

//POST localhots:3000/api/review
router.post('/', createReview);

//GET localhost:3000/api/reviews/:reviewId
router.get('/:reviewId', getReview);

//PUT localhost:3000/api/reviews/:reviewId
router.put('/:reviewId', updateReview);

//DELETE localhost:3000/api/reviews/:reviewId
router.delete('/:reviewId', deleteReview);

export default router;
