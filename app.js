// require express 
const express = require("express")
const app  = express()

require("./model/index")

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "This is test2 page"
    })
})


// listen to port

app.listen(3000,()=>{
    console.log("NodeJs server has started at port 3000")
})
