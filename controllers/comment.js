import Comment from "../models/comment.js";


export const createComment = async (req, res) => {
    try {
        // const newComment = await Comment.create({
        //     Content: req.body.content,
        //     Type: req.body.type,
        //     UserId: req.body.userId,
        //     PreCommentId: req.body.preCommentId
        // });
        // await newComment.save();
        // let curId = newComment.Id;
        // console.log(curId);
        res.status(200).json("comment successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
};