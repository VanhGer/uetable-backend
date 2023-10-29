import express from 'express'
import {getScheduleInWeek} from '../controllers/schedule.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/getScheduleInWeek/:id').get(getScheduleInWeek)
export default router;