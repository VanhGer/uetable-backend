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

export const deleteEventById = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id,
            }
        });
        let {params} = req;
        let curEvent = await Event.findOne({
            where: {Id: params.id}
        });
        if (! curEvent) {
            res.status(404).json("Not found");
        }
        else if (curEvent.ScheduleId != sche.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            await curEvent.destroy();
            res.status(200).json("Delete successfully")
        }
 

    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const updateEventById = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id,
            }
        });
        let {params} = req;
        let curEvent = await Event.findOne({
            where: {Id: params.id}
        });
        if (! curEvent) {
            res.status(404).json("Not found");
        }
        else if (curEvent.ScheduleId != sche.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            curEvent.set({
                Name: (! req.body.name) ? curEvent.Name : req.body.name,
                TimeStart: (! req.body.timestart) ? curEvent.TimeStart : req.body.timestart,
                TimeEnd:(! req.body.timeend) ? curEvent.TimeEnd : req.body.timeend,
                Location: (! req.body.location) ? curEvent.Location : req.body.location,
                Info: (! req.body.info) ? curEvent.Info : req.body.info,
                day: (! req.body.day) ? curEvent.day : req.body.day,
            });
            await curEvent.save();
            res.status(200).json("Update successfully")
        }
 

    } catch (err) {
        res.status(500).json(err.message);
    }
}
