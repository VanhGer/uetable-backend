import express from 'express'
import {
  getUserHandles,
  registerUser,
  modifyUser,
  deleteUser, 
  getUsersByStudentId, 
  authenticateUser,
  changePassword,
  activateAccount,
  resetPassword,
  forgotPassword,
  changeAvatar,
  changeBio,
} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'
import { avatarUpload } from '../middlewares/cloud.js';
const router = express.Router()

router
  .route('/api/users')
  .get(auth, getUserHandles)
  .post(registerUser)
  .put(auth, modifyUser)
  .delete(auth, deleteUser)

router.route('/api/users/activate/:token').get(activateAccount)
router.route('/api/users/forgot-password/').post(forgotPassword)
router.route('/api/users/reset/:token').post(resetPassword)
router.route('/api/users/auth').post(authenticateUser)
router.route('/api/users/:studentid').get(auth, getUsersByStudentId)
router.route('/api/users/change-password/').post(auth, changePassword)
router.post('/api/users/changeAvatar', auth, avatarUpload.single('up'), changeAvatar);
router.route('/api/users/changeBio').post(auth, changeBio);
export default router;