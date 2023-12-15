import Subject from "../models/subject.js";
import { Op } from "sequelize";
import sequelize from "../database/db.js";
import Class from "../models/class.js";
import UserScore from "../models/userScore.js";
import SubjectLike from "../models/subjectLike.js";
import Document from "../models/document.js";
import AccessSubject from "../models/accessSubject.js"
import Score from "../models/score.js";

export const getSubjectByName = async (req, res) => {
    try {
        let str = req.query.name;
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
        let str = req.query.code;
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
        let id = req.body.subjectId;
        const user = res.locals.decodedUser;
        const subjectList = await Subject.findOne({
            where: {
                Id: id
            },
            include: [Class, Document]
        });
        let checkStar = await SubjectLike.findOne({
            where: {
                SubjectId: id,
                UserId: user.Id
            }
        });

        let userScore = await UserScore.findOne({
            raw: true,
            where: {
                SubjectId: id,
                UserId: user.Id
            }
        });
        let score = 0, type = "registered"
        if (userScore == null) {score = "haven't studied"; type = "haven't registered"}
        else {
            let sc = await Score.findOne({
                where: {
                    Id: userScore.ScoreId
                }
            });
            score = {'final': sc.total10};
        }
        let stared = true;
        if (checkStar === null) stared = false;
        let result = {};
        result.id = subjectList.Code;
        result.name = subjectList.Name;
        result.credits = subjectList.Credit;
        result.score = score;
        result.type = type;
        result.like = subjectList.Likes;
        result.documents = subjectList.Documents.length;
        result.stared = stared;
        result.lecturers = [];
        for (let c of subjectList.Classes) {
            let teacher = c.Teacher;
            if (result.lecturers.includes({'name': teacher})) continue;
            result.lecturers.push(teacher);
        }
        await saveSubjectAccessTime(id, user.Id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const getRegisteredSubjectInfo = async (req, res) => {
    try {
        let id = req.body.subjectId;
        const user = res.locals.decodedUser;
        const subject = await Subject.findOne({
            where: {
                Id: id
            },
            include: {
                model: Class
            }
        });

        let userScore = await UserScore.findOne({
            raw: true,
            where: {
                SubjectId: id,
                UserId: user.Id
            },
            include: Score
        });
        let result = {};
        result.id = subject.Code;
        result.name = subject.Name;
        result.credits = subject.Credit;
        result.score = {};
        result.score.midTerm = {'score': userScore['Score.midExamScore'], 'weight': userScore['Score.midExamWeight']};
        result.score.finalTerm = {'score': userScore['Score.finalExamScore'], 'weight': userScore['Score.finalExamWeight']};
        result.score.final = userScore['Score.total10'];
        result.semesterId = userScore.SemesterId;
        result.type = "registered";
        result.lecturer = subject.Classes[0].Teacher;
        res.status(200).json(result);
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

async function saveSubjectAccessTime(subjectId, userId) {
    try {
        let theLast = await AccessSubject.findOne({
            where: {
                SubjectId: subjectId,
                UserId: userId, 
            }
        });
        if (theLast === null) {
            let newAccess = await AccessSubject.create({
                SubjectId: subjectId,
                UserId: userId,
            });
            await newAccess.save();
        } else {
            theLast.LastAccess =  sequelize.literal('CURRENT_TIMESTAMP');
            await theLast.save();
        }
    } catch(err) {
        throw err;
    }
    
}
