import express from 'express'
import 'dotenv/config'
import MajorRouter from './routes/major.js'
import CommentRouter from './routes/comment.js'
import UserRouter from './routes/user.js'
import ScheduleRouter from './routes/schedule.js'
import EventRouter from './routes/event.js'
import SubjectRouter from './routes/subject.js'
import DocumentRouter from './routes/document.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/', MajorRouter);
app.use('/', CommentRouter);
app.use('/', UserRouter);
app.use('/', ScheduleRouter);
app.use('/', EventRouter);
app.use('/', SubjectRouter);
app.use('/', DocumentRouter);

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))