import Event from "../models/event";


async function getEventById(userId) {
    
}

export const createEvent = async (req, res) => {
    try {
        const newEvent = await Event.create({
            Content: req.body.content,
            Type: req.body.type,
            UserId: req.body.userId,
            PreCommentId: req.body.preCommentId
        });
        await newComment.save();
        res.status(200).json("notexist");
        

        res.status(200).json(eventListRes);
    } catch (err) {
        res.status(500).json(err.message);
    }
}