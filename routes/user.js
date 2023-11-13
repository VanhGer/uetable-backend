import express from 'express'
import {
  getUserHandles,
  addUser,
  modifyUser,
  deleteUser, 
  getUsersByStudentId, 
  authenticateUser,
  changePassword
} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router
  .route('/api/users')
  .get(auth, getUserHandles)
  .post(addUser)
  .put(auth, modifyUser)
  .delete(auth, deleteUser)

router.route('/api/users/authenticate').post(authenticateUser)
router.route('/api/users/:studentid').get(auth, getUsersByStudentId)
router.route('/api/users/change-password/').post(auth, changePassword)

export default router;