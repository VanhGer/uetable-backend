import express from 'express'
import { getAverageGpaOfAll, getAverageGpaBySubjectId, getAverageGpaBySchoolYear,
    getAverageCreditBySchoolYear, getCreditRangeInSemester } from '../controllers/statistic.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/statistic/getAverageGpaOfAll').get(auth, getAverageGpaOfAll);
router.route('/api/statistic/getAverageGpaBySubjectId/:subjectId').get(auth, getAverageGpaBySubjectId);
router.route('/api/statistic/getAverageGpaBySchoolYear/:startId').get(auth, getAverageGpaBySchoolYear);
router.route('/api/statistic/getAverageCreditBySchoolYear/:startId').get(auth, getAverageCreditBySchoolYear);
router.route('/api/statistic/getCreditRangeInSemester').get(auth, getCreditRangeInSemester);
export default router;