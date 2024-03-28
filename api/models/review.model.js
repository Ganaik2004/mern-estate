import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
       comment:{
        type:String,
        default:"With its spacious layout and abundant natural light, this house is truly inviting."
       },
       rating:{
        type:Number,
        min:1,
        max:5,
       },
       author:{
        type: mongoose.Schema.Types.ObjectId, 
         ref: "User"
       },listing:{
              type: mongoose.Schema.Types.ObjectId, 
         ref: "Listing"
       }
},{timestamps:true});
const Review = mongoose.model('Review',reviewSchema);
export default Review;