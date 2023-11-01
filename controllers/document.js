import Document from "../models/document.js";
//import uploadCloud from "../middlewares/cloud.js";

export const createDocument = async (req, res) => {
    try {
      
        console.log(req.files);
        console.log(req.body);
        res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err.message);
    }
};