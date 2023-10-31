import Document from "../models/document.js";
//import uploadCloud from "../middlewares/cloud.js";

export const createDocument = async (req, res) => {
    try {
      
        console.log(req.files);

        // const result = await cloudinary.uploader.upload(file.tempFilePath, {
        //     public_id: `${Date.now()}`,
        //     resource_type: "auto",
        //     folder: "Document"
        // })
        // res.status(200).json(result);
        res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err.message);
    }
};