import express from 'express'
import {
    createComment,
    getCommentId,
    modifyComment,
    deleteComment,
    getVersionByComment,
} from '../controllers/comment.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
  .route('/api/comment/')
  .get(auth, getCommentId)
  .post(auth, createComment)
  .put(auth, modifyComment)
  .delete(auth, deleteComment)

router
    .route('/api/comment/get-versions/')
    .get(auth, getVersionByComment)

export default router;