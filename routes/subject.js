import express from 'express'
import { getSubjectByName , getSubjectByCode, getSubjectInfo, getSubjectHaveNotLearn, 
    starASubject, getRegisteredSubjectInfo} from '../controllers/subject.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/subject/getSubjectByName').get(auth, getSubjectByName);
router.route('/api/subject/getSubjectByCode').get(auth, getSubjectByCode);
router.route('/api/subject/getSubjectInfo').get(auth, getSubjectInfo);
router.route('/api/subject/getRegisteredSubjectInfo').get(auth, getRegisteredSubjectInfo);
router.route('/api/subject/starASubject').post(auth, starASubject);

router.route('/api/subject/getSubjectHaveNotLearn').get(auth, getSubjectHaveNotLearn);
export default router;