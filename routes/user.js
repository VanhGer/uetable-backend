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
} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router
  .route('/api/users')
  .get(auth, getUserHandles)
  .post(registerUser)
  .put(auth, modifyUser)
  .delete(auth, deleteUser)

router.route('/api/activate/:token').get(activateAccount)
router.route('/api/users/authenticate').post(authenticateUser)
router.route('/api/users/:studentid').get(auth, getUsersByStudentId)
router.route('/api/users/change-password/').post(auth, changePassword)

export default router;