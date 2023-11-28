import express from 'express'
import {getScheduleInWeek} from '../controllers/schedule.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/schedule/getScheduleInWeek').get(auth, getScheduleInWeek)
export default router;