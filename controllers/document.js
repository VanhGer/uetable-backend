import Document from "../models/document.js";
import User from "../models/user.js";
import Subject from "../models/subject.js";
import { getPageLikes } from "./page.js";
//import uploadCloud from "../middlewares/cloud.js";
import { v2 as cloudinary } from 'cloudinary';

export const createDocument = async (req, res) => {
    try {
        const body = JSON.parse(req.body.request);
        const user = res.locals.decodedUser;
        try {
            let newDocument = await Document.create({
                    Name: body.name,
                    Category: body.category,
                    Link: req.files[0].path,
                    UserId: user.Id,
                    SubjectId: body.subjectId
                });
            await newDocument.save();
        } catch (err) {
            for (let file of req.files) {
                if (file) {
                    cloudinary.uploader.destroy(file.filename);
                }
            }
            res.status(500).json(err.message);
            return;
        }

        for (let i = 1; i < req.files.length; i++) {
            let file = req.files[i];
            let newDocument = await Document.create({
                Name: body.name,
                Category: body.category,
                Link: file.path,
                UserId: user.Id,
                SubjectId: body.subjectId
            });
            await newDocument.save();
        }
        res.status(200).json("Create successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}; 

export const getDocumentById = async (req, res) => {
    try {
        const docId = req.query.id;
        const doc = await Document.findOne({
            where: {
                Id: docId
            }
        }) 
        if (doc === null) {
            res.status(404).json("Not found document");
        } else {
            let user = await User.findOne({
                raw: true,
                where: {
                    Id: doc.UserId,
                }
            });
            let subject = await Subject.findOne({
                raw: true,
                where: {
                    Id: doc.SubjectId
                }
            });
            if (user === null || subject === null) {
                res.status(404).json("Cannot find document because it is invalid.");
            } else {
                let tmp = {};
                tmp.id = doc.Id;
                tmp.name = doc.Name;
                tmp.createAt = doc.CreatedAt;
                tmp.like = await getPageLikes(doc.Id, 'D');
                tmp.download = doc.Download;
                tmp.category = doc.Category;
                tmp.link = doc.Link;
                tmp.userName = user.Name;
                tmp.subject = subject.Name;
                tmp.subjectId = subject.Id;
                res.status(200).json(tmp);
            }
            
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}  

export const getDocumentOfSubject = async (req, res) => {
    try {
        let subjectId = req.query.subjectId;
        let documentList = await Document.findAll({
            raw: true,
            where: {
                SubjectId: subjectId
            }
        });
        let result = [];
        for (let c of documentList) {
            let user = await User.findOne({
                raw: true,
                where: {
                    Id: c.UserId,
                }
            });
            let tmp = {};
            tmp.id = c.Id;
            tmp.name = c.Name;
            tmp.createAt = c.CreateAt;
            tmp.like = await getPageLikes(c.Id, 'D');
            tmp.download = c.Download;
            tmp.category = c.Category;
            tmp.link = c.Link;
            tmp.userName = user.Name;
            
            result.push(tmp);
        }
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
    
    
    
}