import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const docStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'pdf', 'zip', 'rar', 'docx', 'ppt', 'pptx'],
  params: {
    folder: 'uetable/Document'
  }
});

const docUpload = multer({ storage: docStorage });
export {docUpload}