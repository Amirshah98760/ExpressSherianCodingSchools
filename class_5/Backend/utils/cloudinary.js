const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Node's file system

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects if it's image/pdf/video
      folder: "School_Management_System" 
    });
    
    // Successfully uploaded, delete the local temp file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // If upload fails, still delete the local file to keep server clean
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = { uploadOnCloudinary };