

import express from 'express'
import { createDocument } from "../controllers/document.js";
import { docUpload } from '../middlewares/cloud.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();


router.post('/api/document/createDocument', auth, docUpload.array('up') ,createDocument);
export default router;