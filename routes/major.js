import express from 'express'
import {getMajorById} from "../controllers/major.js";
const router = express.Router();


router.get('/majorById', getMajorById)
export default router;