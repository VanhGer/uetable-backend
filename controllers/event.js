import Event from "../models/event.js";


export const createEvent = async (req, res) => {
    try {
        const newEvent = await Event.create({
            Name: req.body.name,
            TimeStart: req.body.timeStart,
            TimeEnd: req.body.timeEnd,
            Location: req.body.location,
            Info: req.body.info,
            day: req.body.day,
            color: req.body.color,
            ScheduleId: req.body.scheduleId,
        });
        await newEvent.save();
        res.status(200).json("create successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}