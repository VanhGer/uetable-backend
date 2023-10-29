import express from 'express'
import { getSubjectByName , getSubjectByCode, getSubjectInfo} from '../controllers/subject.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/getSubjectByName').get(getSubjectByName);
router.route('/getSubjectByCode').get(getSubjectByCode);
router.route('/getSubjectInfo').get(getSubjectInfo);
export default router;