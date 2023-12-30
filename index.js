import express from 'express'
import 'dotenv/config'
import MajorRouter from './routes/major.js'
import CommentRouter from './routes/comment.js'
import PageRouter from './routes/page.js'
import UserRouter from './routes/user.js'
import ScheduleRouter from './routes/schedule.js'
import EventRouter from './routes/event.js'
import SubjectRouter from './routes/subject.js'
import DocumentRouter from './routes/document.js'
import ScoreRouter from './routes/score.js';
import ReportRouter from './routes/report.js';
import StatisticRouter from './routes/statistic.js';
import AdminRouter from './routes/admin.js';
import NotificationRouter from './routes/notification.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import AdminJS from 'adminjs'
// import AdminJSExpress from '@adminjs/express';
// import { Database, Resource } from '@adminjs/sequelize'
import User from './models/user.js';
import Document from './models/document.js';
import sequelize from './database/db.js';
// import { useTranslation } from 'adminjs'
import { superAuth} from './middlewares/superauth.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    // const ipAddress = req.connection.remoteAddress
    // const ipPort = req.connection.remotePort
    // console.log(ipAddress);
    // console.log(ipPort);
    console.log(req.headers.host);
    res.send('Hello World!')
})

app.use('/', PageRouter);
app.use('/', MajorRouter);
app.use('/', CommentRouter);
app.use('/', UserRouter);
app.use('/', ScheduleRouter);
app.use('/', EventRouter);
app.use('/', SubjectRouter);
app.use('/', DocumentRouter);
app.use('/', ScoreRouter);
app.use('/', StatisticRouter);
app.use('/', ReportRouter);
app.use('/', AdminRouter);
app.use('/', NotificationRouter);

const DEFAULT_ADMIN = {
  studentid: '21020006',
  password: 'password',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

// AdminJS.registerAdapter({ Database, Resource })

const usersNavigation = {
    name: 'Users',
    icon: 'User',
}

// const adminOptions = {
//     // databases: [sequelize],
//     branding: {
//         companyName: 'UETable', // title of page
//         logo: false,    // don't use adminJS default logo
//         softwareBrothers: false, // hide adminJS link
//         // favicon: ""
//     },
//     resources: [
//         {
//             resource: User,
//             options: {
//                 navigation: 
//                 {
//                     'icon': 'User',
//                 },
//                 listProperties: ['Id', 'StudentId', 'Name', ],
//                 filterProperties: ['Id', 'StudentId', 'Name', ],
//                 editProperties: ['StudentId', 'Name', 'Bio', 'Avatar'],
//                 showProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
//             },
//         },
//         {
//             resource: Document,
//             options: {
//                 navigation: {
//                     // 'name': 'Documents',
//                     'icon': 'note',
//                 },
//                 listProperties: ['Id', 'Name', 'Category', 'Download', 'Like'],
//                 // filterProperties: ['Id', 'StudentId', 'Name', ],
//                 // editProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
//                 // showProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
//             },
//         },
//         {
//             resource: sequelize.models.Subject,
//             options: {
//                 navigation: {}
//             },
//         },
//         {
//             resource: sequelize.models.Comment,
//             options: {
//                 navigation: {}
//             },
//         }, 
//         {
//             resource: sequelize.models.Report,
//             options: {
//                 navigation: {}
//             },
//         }
//     ],
// }

// const adminJs = new AdminJS(adminOptions);
// const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     adminJs,
//     {
//       authenticate,
//       cookieName: "AdminJS",
//       cookiePassword: "Secret",
//     },
//     null,
//     {
//       store: sequelize,
//       resave: true,
//       saveUninitialized: true,
//       secret: 'Secret',
//       name: 'adminjs',
//     }
//   );
// const adminRouter = AdminJSExpress.buildRouter(adminJs)
// app.use(adminJs.options.rootPath, superAuth, adminRouter)

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))
