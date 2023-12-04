import express from 'express'
import { getSemesterInfoById } from '../controllers/score.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/score/getSemesterInfo/:semesterId').get(auth, getSemesterInfoById);
export default router;