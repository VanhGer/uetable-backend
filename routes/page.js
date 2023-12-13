import express from 'express'
import {
    likeByPage,
    getLikeByPage,
    getCommentByPage,
    getCommentCountByPage,
} from '../controllers/page.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
    .route('/api/page/comment/')
    .get(auth, getCommentByPage)

router
    .route('/api/page/comment-count/')
    .get(auth, getCommentCountByPage)

router
    .route('/api/page/like/')
    .post(auth, likeByPage)
    .get(auth, getLikeByPage)

export default router;