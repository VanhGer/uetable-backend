import express from 'express'
import {
  getUserHandles,
  addUser,
  modifyUser,
  deleteUser, 
  getUsersById, 
  authenticateUser,
} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router
  .route('/users')
  .get(auth, getUserHandles)
  .post(addUser)
  .put(auth, modifyUser)
  .delete(auth, deleteUser)

router.route('/users/authenticate').post(authenticateUser)
router.route('/users/:id').get(auth, getUsersById)


export default router;