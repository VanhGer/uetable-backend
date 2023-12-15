import Comment from "../models/comment.js";
import PageComment from "../models/pageComment.js";
import CommentDTO from "../dto/comments.js";
import UserLike from "../models/userLike.js";

export const getCommentByPage = async (req, res) => {
    try {
        const { pageId , pageType, offset, limit} = req.body;
        const decodedUser = res.locals.decodedUser
        const comments = await PageComment.findAll({
            where: {
                PageId: pageId,
                pageType: pageType,
                parentId: 0,
            },
            offset: offset,
            limit: limit,
        });

        const commentDTOs = await Promise.all(comments.map( async (comment) => {
            // console.log(comment)
            const commentModel = await Comment.findByPk(comment.CommentId)
            const commentDTO = await CommentDTO.convertToDto(commentModel, decodedUser.Id);
            return commentDTO;
        }));

        // console.log(commentDTOs)
        res.status(200).send(commentDTOs);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getCommentCountByPage = async (req, res) => {
    try {
        const { pageId , pageType } = req.body;
        const comments = await PageComment.count({
            where: {
                PageId: pageId,
                pageType: pageType,
                parentId: 0,
            },
        });

        // console.log(commentDTOs)
        res.status(200).send({
            count: comments,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

export const likeByPage = async (req, res) => {
    try {
        const { pageId , pageType , score} = req.body;
        const decodedUser = res.locals.decodedUser
        const userLike = await UserLike.findOne({
            where: {
                PageId: pageId,
                PageType: pageType,
                UserId: decodedUser.Id,
            },
        });

        if (!userLike) {
            const newUserLike = await UserLike.create({
                PageId: pageId,
                PageType: pageType,
                UserId: decodedUser.Id,
                Score: score,
            });
            await newUserLike.save();
        } else {
            userLike.Score = score;
            await userLike.save();
        }

        res.status(200).send({
            message: "Successfully like!",
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getPageLikes(pageId, pageType) {
    try {
        const likes = await UserLike.count({
            where: {
                PageId: pageId,
                PageType: pageType,
                Score: 1,
            },
        });
        return likes;
    } catch (err) {
        throw err;
    }
}

export async function getPageDislikes(pageId, pageType) {
    try {
        const dislikes = await UserLike.count({
            where: {
                PageId: pageId,
                PageType: pageType,
                Score: -1,
            },
        });
        return dislikes;
    } catch (err) {
        throw err;
    }
}

export async function getUserlikes(pageId, pageType, userId) {
    try {
        const userLike = await UserLike.findOne({
            where: {
                PageId: pageId,
                PageType: pageType,
                UserId: userId
            },
        });
        return userLike;
    } catch (err) {
        throw err;
    }
}


export const getLikeByPage = async (req, res) => {
    try {
        const { pageId , pageType } = req.body;
        const decodedUser = res.locals.decodedUser
        const likes = await getPageLikes(pageId, pageType);

        const dislikes = await getPageDislikes(pageId, pageType);
        const userLike = await getUserlikes(pageId, pageType, decodedUser.Id);

        if (!userLike) {
            res.status(201).send({
                likes: likes,
                dislikes: dislikes,
                userLike: 0,
            });
            return
        }

        res.status(201).send({
            likes: likes,
            dislikes: dislikes,
            userLike: userLike.Score,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}