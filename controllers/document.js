import Document from "../models/document.js";
//import uploadCloud from "../middlewares/cloud.js";

export const createDocument = async (req, res) => {
    try {
        const body = JSON.parse(req.body.request);
        for (let file of req.files) {
            let newDocument = await Document.create({
                Name: body.name,
                Category: body.category,
                Link: file.path,
                UserId: body.userId,
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