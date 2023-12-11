// Connect your app to Cloudinary.
import dotenv from 'dotenv'
dotenv.config()
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadCloudinary = async (file) => {
  const img = await cloudinary.uploader.upload(
    file,
    { folder: 'Cocoa' },
    (result) => result
  );
  return img;
};