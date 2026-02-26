require('dotenv').config();
const express = require('express');
const postModel = require('./models/post.model');
const { uploadOnCloudinary } = require("./utils/cloudinary");
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Node's file system
const multer = require('multer');
const cors = require('cors');

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.get('/', (req , res)=>{
    res.send("Welcome to the home page");
})



app.post('/create-post', upload.single("image"), async (req, res) => {
  try {
    const localFilePath = req.file?.path;
    const { caption } = req.body;

    // Check if file was uploaded
    if (!localFilePath) {
      return res.status(400).json({
        error: "No image file provided"
      });
    }

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects if it's image/pdf/video
      folder: "School_Management_System" // Keeps your cloud organized
    });

    // Successfully uploaded, delete the local temp file
    fs.unlinkSync(localFilePath);

    // Create post in database with Cloudinary image URL
    const post = new postModel({
      image: cloudinaryResponse.secure_url,
      caption
    });
    await post.save();

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    // If upload fails, delete the local file to keep server clean
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      error: error.message
    });
  }
})

app.get('/posts', async(req , res )=>{
  const posts = await postModel.find();

  res.status(200).json({
    message:"Posts fetch successfully",
    posts
  })
})




module.exports = app;