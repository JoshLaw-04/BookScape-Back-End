"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const router = (0, express_1.Router)();
//GET localhost:3000/api/books
router.get('/', bookController_1.getAllBooks);
// GET localhost:3000/api/books
router.get('/:volumeId', bookController_1.getBook);
//POST localhost:3000/api/books
router.post('/', bookController_1.setBook);
exports.default = router;
