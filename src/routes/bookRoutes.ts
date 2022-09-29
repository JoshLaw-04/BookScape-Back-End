import { Router } from 'express';
import { getAllBooks, getBook, setBook } from '../controllers/bookController';

const router = Router();

//GET localhost:3000/api/books
router.get('/', getAllBooks);

// GET localhost:3000/api/books
router.get('/:volumeId', getBook);

//POST localhost:3000/api/books
router.post('/', setBook);

export default router;
