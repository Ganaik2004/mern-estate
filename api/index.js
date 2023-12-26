import express from "express"
const port = 3000;
const app = express();
app.listen(port,()=>{
    console.log("The Server is Started At Port : 3000")
})
