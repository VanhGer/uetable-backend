import express from 'express'
import {getSchedule} from '../controllers/schedule.js';
const router = express.Router();


router.get('/getSchedule', getSchedule);
export default router;