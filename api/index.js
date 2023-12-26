import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
dotenv.config();

// Connected to the database
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Sucessfully Connected to mongodb")
}).catch((err)=>{
    console.log(err)
})


const port = process.env.PORT || 4000;
const app = express();
app.listen(port,()=>{
    console.log(`The Server is Started At Port : ${port}`)
})
app.use("/api/user",userRouter);