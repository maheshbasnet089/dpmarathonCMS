// require express 
const express = require("express")
const { blogs } = require("./model/index")
const app  = express()
// requiring multer middleware 

const {multer,storage} = require("./middleware/multerConfig")
// const multer = require("./middleware/multerConfig").multer
// const storage = require("./middleware/multerConfig").storage
const upload = multer({storage : storage})

require("./model/index")
// telling express to parse the incoming json data /
app.use(express.json())

app.use(express.static("./uploads/"))

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "This is test2 page"
    })
})

// createBlog Api 
app.post("/blogs",upload.single('blogImage') ,async (req,res)=>{


    const title = req.body.title 
    const subTitle = req.body.subTitle
    const description = req.body.description 

    // ALTERNATIVE 
    // const {title,subTitle,description} = req.body

    // insert the data to blogs table
   await blogs.create({
        title ,
        subTitle,
        description,
        imageUrl : "http://localhost:3000/" +  req.file.filename
    })
    res.status(200).json({
        message : "Blog created successfully"
    })
})

// all Blogs Read API 
app.get("/blogs",async (req,res)=>{
  const data =  await blogs.findAll() // retuns array  [].length = 0 
 if(data.length ==0){
    res.status(404).json({
        message : "No Blog found",
        data 
      })
 }else{
    res.status(200).json({
        message : "Blogs fetched successfully",
        data 
      })
 }

})

// single Blog Read API 
app.get("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    // const {id} = req.params 

//    const data =  await blogs.findByPk(id)  // returns object ==> {} 
const data = await blogs.findAll({
    where : {
        id : id
    }
}) // SELECT * FROM BLOGS WHERE id = id ==> returns array => []
   res.status(200).json({
    message : "Blog Fetched Successfully",
    data
   })
})

// delete blog api 
app.delete("/blogs/:id",async(req,res)=>{
    const id = req.params.id 
   await blogs.destroy({
        where : {
            id : id
        }
    })
    res.status(200).json({
        message : "Blog deleted Successfully"
    })
})

// listen to port

app.listen(3000,()=>{
    console.log("NodeJs server has started at port 3000")
})
