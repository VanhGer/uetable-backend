import express from 'express'
import { getSubjectByName , getSubjectByCode, getSubjectInfo} from '../controllers/subject.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/subject/getSubjectByName').get(getSubjectByName);
router.route('/api/subject/getSubjectByCode').get(getSubjectByCode);
router.route('/api/subject/getSubjectInfo').get(getSubjectInfo);
export default router;