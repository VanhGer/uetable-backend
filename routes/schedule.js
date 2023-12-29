import express from 'express'
import {getScheduleInWeek, autoCreateEventClass, getSubjectInWeek} from '../controllers/schedule.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/schedule/getScheduleInWeek').get(auth, getScheduleInWeek);
router.route('/api/schedule/getSubjectInWeek').get(auth, getSubjectInWeek);
router.route('/api/schedule/autoCreateEventClass').get(auth, autoCreateEventClass);
export default router;