import { RequestHandler } from "express";
import { Review } from "../models/review";

export const getAllReviews: RequestHandler = async (req,res,next) => {
    //we will need to add an "include" constraint in .findAll() to control for
    //allowing logged in users to view all of their own reviews
    let reviews = await Review.findAll();
    res.status(200).json(reviews);
};

