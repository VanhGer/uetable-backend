import Document from "../models/document.js";
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
        const docId = req.body.id;
        const doc = await Document.findOne({
            where: {
                Id: docId
            }
        }) 
        res.status(200).json(doc);
        //res.status(200).json("Create successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}  