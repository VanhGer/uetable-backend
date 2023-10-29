import express from 'express'
import { createEvent } from '../controllers/event.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/createEvent').post(createEvent);
export default router;