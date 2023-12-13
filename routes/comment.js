import express from 'express'
import {
    createComment,
    getCommentId,
    modifyComment,
    deleteComment 
} from '../controllers/comment.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
  .route('/api/comment/')
  .get(auth, getCommentId)
  .post(auth, createComment)
  .put(auth, modifyComment)
  .delete(auth, deleteComment)

export default router;