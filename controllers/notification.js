import Notification from "../models/notification.js";

export async function createNoti(userId, content, link = null) {
    try {
        let newNoti = await Notification.create({
            Content: content,
            UserId: userId,
            Link: link
        });
        await newNoti.save();
    } catch (err) {
        throw err;
    }
}

// createNoti(13, "Test Notification", "xyz");

export const getNotification = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let notiList = await Notification.findAll({
            raw: true,
            where: {
                UserId: user.Id
            }
        });
        let ans = {};

        if (notiList === null) res.status(200).json(ans);
        else res.status(200).json(notiList);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const seenNotification = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const notiId = req.body.notiId;
        let noti = await Notification.findOne({
            where: {
                UserId: user.Id,
                Id: notiId
            }
        });
        if (noti === null) {
            res.status(404).json("Notification not found");
            return;
        }
        await noti.update({
            Seen: true
        });
        await noti.save();
        res.status(200).json("Seen successfully");
    } catch (err) {
        res.status(500).json(err);
    }
}