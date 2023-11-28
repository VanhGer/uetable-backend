import Event from "../models/event.js";
import Schedule from "../models/Schedule.js";

export const createEvent = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id
            }
        });
        const newEvent = await Event.create({
            Name: req.body.name,
            TimeStart: req.body.timeStart,
            TimeEnd: req.body.timeEnd,
            Location: req.body.location,
            Info: req.body.info,
            day: req.body.day,
            color: req.body.color,
            ScheduleId: sche.Id,
        });
        await newEvent.save();
        res.status(200).json("create successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}