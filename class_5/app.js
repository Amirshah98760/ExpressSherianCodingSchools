const express = require('express');
const postModel = require('./models/post.model');
const multer = require('multer');
const app = express();

app.use(express.json());
const upload = multer({storage: multer.memoryStorage()});

app.get('/', (req , res)=>{
    res.send("Welcome to the home page");
})



app.post('/create-post',upload.single("image"), async (req, res )=>{
  console.log(req.body);
    console.log(req.file);

//    try {
//     const {image, caption} = req.body;

//     const post = new postModel({
//         image,
//         caption
//     })
//     post.save();
//     res.status(201).json({
//         message:"Post created successfully",
//         post
//     })
    
//    } catch (error) {
//     res.status(500).json({
//         error:error.message
//     })
//    }
})






module.exports = app;