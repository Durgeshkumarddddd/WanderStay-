const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

// console.log('CLOUD_NAME:', process.env.CLOUD_NAME);
// console.log('CLOUD_API_KEY:', process.env.CLOUD_API_KEY);
// console.log('CLOUD_API_SECRET:', process.env.CLOUD_API_SECRET);


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,

});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Go",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
