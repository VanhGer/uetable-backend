import Subject from "../models/subject.js";
import { Op } from "sequelize";
import Class from "../models/class.js";
import UserScore from "../models/userScore.js";
import SubjectLike from "../models/subjectLike.js";
import AccessSubject from "../models/accessSubject.js"

export const getSubjectByName = async (req, res) => {
    try {
        let str = req.body.name;
        // console.log(req);
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
        let str = req.body.code;
        console.log(req);
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
        let id = req.body.id;
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

export const getSubjectHaveNotLearn = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let learnedArray = await UserScore.findAll({
            raw: true,
            where: {
                UserId: user.Id
            },
            include: [Subject],
        })
        let courses = [];
        for (let c of learnedArray) {
            courses.push(c["Subject.Code"]);
        }
        let result = await Subject.findAll({
            raw: true, 
            where: {
                Code: {
                    [Op.notIn]: courses
                }
            },
            attributes: ['Name', 'Code', 'Credit']
        })
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const starASubject = async(req, res) => {
    try {
        let subjectId = req.body.subjectId;
        let star = req.body.star;
        const user = res.locals.decodedUser;
        if (star == false) {
            let subjectLike = await SubjectLike.findOne({
                where: {
                    UserId: user.Id,
                    subjectId: subjectId
                }
            });
            if (subjectLike !== null) {
                await subjectLike.destroy();
            }
        } else {
            let subjectLike = await SubjectLike.findOne({
                raw: true,
                where: {
                    UserId: user.Id,
                    subjectId: subjectId
                }
            });
            if (subjectLike === null) {
                let cur = await SubjectLike.create({
                    SubjectId: subjectId,
                    UserId: user.Id,
                });
                await cur.save();
            }
        }
        res.status(200).json("Successfully");
    } catch (err) {
        res.status(500).json(err.message);
    } 
}

