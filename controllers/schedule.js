import Schedule from "../models/Schedule.js";
import Class from "../models/class.js";
import Event from "../models/event.js";
import sequelize from "../database/db.js";
import Subject from "../models/subject.js";
import { Op } from "sequelize";
function changeStyle(list) {
    
}

export const getScheduleInWeek = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const difference = currentDayOfWeek - 0;
        const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - difference);

        const lastDayOfWeek = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + 6);
        console.log('First day of the week:', firstDayOfWeek);
        console.log('Last day of the week:', lastDayOfWeek);

        const { params } = req
        const sche = await Schedule.findOne({
            where: {
                UserId: params.id
            }
        });
        let scheId = sche.UserId;
        const eventList = await Event.findAll({
            raw: true,
            where: {
                ScheduleId: scheId,
                [Op.or]: [
                    {
                        day: {
                            [Op.between]: [firstDayOfWeek, lastDayOfWeek]
                        }
                        
                    }, 
                    {
                        day: null
                    }
                ]
            },
            include: {
                model: Class,
                include: {
                    model: Subject,
                }
            },
            attributes: [
                'id', 'name', 'timeStart', 'timeEnd', 'day', 'location', 'info', 'color',
                [sequelize.col('Classes.Code'), 'classCode'],
                [sequelize.col('Classes.Teacher'), 'teacher'],
                [sequelize.col('Classes.number'), 'number'],
                [sequelize.col('Classes.group'), 'group'],
                [sequelize.col('Classes.weekday'), 'weekday'],
                [sequelize.col('Classes.lessonStart'), 'lessonStart'],
                [sequelize.col('Classes.lessonEnd'), 'lessonEnd'],
                [sequelize.col('Classes.Subject.Credit'), 'credit'],
            ]
        });
        //console.log(eventList);
        //res.status(200).json(eventList);
        const eventListRes = eventList.map(({id, name, timeStart, timeEnd, day, location, info, color,
            classCode, teacher, number, group, weekday, lessonStart, lessonEnd, creadit}) => ({ id, name, 
            timeStart, timeEnd, day, location, info, color, classCode, teacher, number, group, 
            weekday, lessonStart, lessonEnd, creadit }));

        res.status(200).json(eventListRes);
    } catch (err) {
        res.status(500).json(err.message);
    }
}