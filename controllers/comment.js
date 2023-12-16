import Comment from "../models/comment.js";
import PageComment from "../models/pageComment.js";
import CommentDTO from "../dto/comments.js";
import CommentVersionDTO from "../dto/commentVersion.js";
import User from "../models/user.js";
import VersionComment from "../models/versionComment.js";
import Subject from "../models/subject.js";


export const createComment = async (req, res) => {
    try {
        let { content, pageType, pageId, parentId, preCommentId } = req.body;
        if (pageType === 'S') {
            const subject = await Subject.findOne({
                where: {
                    Code: pageId
                }
            })
            if (!subject) {
                res.status(404).send({ error: 'Subject not found' })
                return
            }
            // console.log(subject)
            pageId = subject.Id
        }
        console.log(pageId)
        const decodedUser = res.locals.decodedUser
        const comment = await Comment.create({
            Content: content,
            UserId: decodedUser.Id,
            ParentId: parentId,
            PreCommentId: preCommentId
        });

        await comment.save();

        const pageComment = await PageComment.create({
            CommentId: comment.Id,
            PageType: pageType,
            PageId: pageId,
            ParentId: parentId,
        });

        await pageComment.save();

        res.status(201).send({
            message: 'Comment successfully created',
            CommentId: comment.Id,
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const getCommentId = async (req, res) => {
    try {
        const commentId = req.params.commentid;
        const decodedUser = res.locals.decodedUser
        const comment = await Comment.findOne({
            where: {
                Id: commentId
            }
        });
        const commentDTO = await CommentDTO.convertToDto(comment, decodedUser.Id);
        res.status(200).send(commentDTO);
    } catch (error) {
        res.status(500).send(error)
    }
    
}

export const modifyComment = async (req, res) => {
    try {
        const { commentId, content} = req.body
        const loggedInUser = res.locals.decodedUser
        const comment = await Comment.findOne({
            where: {
                Id: commentId
            }
        })

        if (!comment) { 
            res.status(404).send({ error: 'Comment not found' })
            return
        }

        if (comment.UserId !== loggedInUser.Id) {
            const user = await User.findOne({
                where: {
                    Id: loggedInUser.Id
                }
            })
            if (user.Role != 1) {
                res.status(401).send({ error: 'You can not modify this comment!'})
                return
            }
        }

        const newComment = await VersionComment.create({
            Content: content,
            UserId: loggedInUser.Id,
            CommentId: comment.Id,
        });

        await newComment.save();

        comment.Content = content;
        comment.CreatedAt = newComment.CreatedAt;

        await comment.save();
        res.status(201).send({ message: 'Comment successfully modified' })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body
        const loggedInUser = res.locals.decodedUser
        const comment = await Comment.findOne({
            where: {
                Id: commentId
            }
        })

        if (!comment) {
            res.status(404).send({ error: 'Comment not found' })
            return
        } 

        const user = await User.findOne({
            where: {
                Id: loggedInUser.Id
            }
        })

        if (user.Role != 1) {
            res.status(401).send({ error: 'You not own of this comment' })
            return
        }

        const deleteComment = await Comment.destroy({
            where: {
                Id: commentId
            }
        })

        if (deleteComment !== 0) {
            res.status(200).send({ message: 'The comment has been deleted.' })
        } else {
            res.status(500).send({ error: 'Failed to destroy the commnet.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getVersionByComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const decodedUser = res.locals.decodedUser
        const comments = await VersionComment.findAll({
            where: {
                CommentId: commentId,
            },
            order: [['CreatedAt', 'DESC']],
        });

        const commentDTOs = await Promise.all(comments.map( async (comment) => {
            const commentVersionDTO = await CommentVersionDTO.convertToDto(comment, decodedUser.Id);
            return commentVersionDTO;
        }));

        // console.log(commentDTOs)
        res.status(200).send(commentDTOs);
    } catch (error) {
        res.status(500).send(error)
    }
}