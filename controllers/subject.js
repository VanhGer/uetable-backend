import Subject from "../models/subject.js";
import { Op } from "sequelize";
import Class from "../models/class.js";

export const getSubjectByName = async (req, res) => {
    try {
        let str = req.query.input;
        const subjectList = await Subject.findAll({
            where: {
                Name: {
                    [Op.like]: `%${str}%`
                }
            }
        }) 
        res.status(200).json(subjectList);
    } catch (err) {
        res.status(500).json(err.message);
    } 
}

export const getSubjectByCode = async (req, res) => {
    try {
        let str = req.query.input;
        const subjectList = await Subject.findAll({
            where: {
                Code: {
                    [Op.like]: `%${str}%`
                }
            }
        }) 
        res.status(200).json(subjectList);
    } catch (err) {
        res.status(500).json(err.message);
    } 
}

export const getSubjectInfo = async (req, res) => {
    try {
        let id = req.query.id;
        const subjectList = await Subject.findAll({
            where: {
                Id: id
            },
            include: {
                model: Class,
            },
            
        }) 
        res.status(200).json(subjectList);
    } catch (err) {
        res.status(500).json(err.message)
    }
}