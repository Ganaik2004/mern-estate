import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.routr.js'
import cookieParser from 'cookie-parser'
dotenv.config();

// Connected to the database
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Sucessfully Connected to mongodb")
}).catch((err)=>{
    console.log(err)
})


const port = process.env.PORT || 4000;
const app = express();
app.use(express.json())
app.use(cookieParser());
app.listen(port,()=>{
    console.log(`The Server is Started At Port : ${port}`)
})
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})