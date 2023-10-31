

import express from 'express'
import { createDocument } from "../controllers/document.js";
import { docUpload } from '../middlewares/cloud.js';
const router = express.Router();


router.post('/createDocument', docUpload.array('up') ,createDocument);
export default router;