import Schedule from "../models/Schedule.js";
import Class from "../models/class.js";
import Event from "../models/event.js";
import sequelize from "../database/db.js";
import Subject from "../models/subject.js";

export const getSchedule = async (req, res) => {
    try {
        let userId = req.query.userId;
        const sche = await Schedule.findOne({
            where: {
                UserId: userId 
            }
        });
        let scheId = sche.UserId;
        const eventList = await Event.findAll({
            raw: true,
            where: {
                ScheduleId: scheId
            },
            include: {
                model: Class,
                include: {
                    model: Subject,
                }
            },
            attributes: [
                'Id', 'Name', 'TimeStart', 'TimeEnd', 'Location', 'Info', 
                [sequelize.col('Classes.Code'), 'ClassNum'],
                [sequelize.col('Classes.Teacher'), 'Teacher'],
                [sequelize.col('Classes.Subject.Code'), 'CourseCode'],
            ]
        });
        console.log(eventList);
        const eventListRes = eventList.map(({ Id, Name, TimeStart, TimeEnd, Location, Info, 
        ClassNum, Teacher, CourseCode}) => ({ Id, Name, TimeStart, TimeEnd, Location, Info, 
            ClassNum, Teacher, CourseCode }));

        res.status(200).json(eventListRes);
    } catch (err) {
        res.status(500).json(err.message);
    }
}