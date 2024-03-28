// import Listing from "../../client/src/pages/Listing.jsx";
import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const createReview = async (req,res,next)=>{
    try{
        const listing = await Listing.findById(req.params.id);
        if(!listing){
          return next(new errorHandler(404,"Cannot find listing"))
        }
        const review = await Review.create(req.body);
        listing.reviews.push(review);
        await review.save();
        await listing.save();
        return res.status(201).json(review);
    }catch(error){
        next(error);
    }
}
export const deleteReview  = async(req,res,next)=>{
    const {id,reviewId} = req.params;
    // const {listingId} = req.body.id;
    // console.log(id,listingId)
    try{
        const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        if(!listing){
            return next(new errorHandler(404,"Cannot find listing"))
        }
    await Review.findByIdAndDelete(reviewId);
    }catch(error){
          next(error);
    }
}