import express from 'express'
import {getScheduleInWeek, autoCreateEventClass} from '../controllers/schedule.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/schedule/getScheduleInWeek').get(auth, getScheduleInWeek);
router.route('/api/schedule/autoCreateEventClass').get(auth, autoCreateEventClass);
export default router;