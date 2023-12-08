import UserScore from "../models/userScore.js";
import Score from "../models/score.js";
import Subject from "../models/subject.js";
import Semester from "../models/semester.js";
import { Op } from "sequelize";
import sequelize from "../database/db.js";

async function semesterInfoById(userId, id) {
    try {
        let result = {};
        let sem = await Semester.findOne({
            raw: true,
            where: {
                Id: id
            }
        });

        if (! sem) {
            return {};
        }
        result.id = sem.Id;
        result.title = sem.Name;
        result.subjects = [];
        result.sumOfCredits = 0;
        result.semesterGPA = 0.0;
        // result.semesterGPAscale4 = 0.0;
        result.totalMark10 = 0.0;
        result.cnt = 0.0;
        // result.totalMark4 = 0.0
        let data = await UserScore.findAll({
            raw: true,
            where: {
                UserId: userId,
                SemesterId: id
            },
            include: [Semester, Score, Subject],
        });
        let tmp = 0;
        for (let c of data) {
            let subj = {};
            let sco = {};
            // subj.userScoreId = c['Id'];
            subj.id = c["Subject.Code"];
            subj.name = c["Subject.Name"];
            subj.credits = c["Subject.Credit"];
            // subj.type = "registered";
            subj.semesterId = result.id;

            sco.midTerm = {score: c["Score.midExamScore"], weight: c["Score.midExamWeight"]};
            sco.finalTerm = {score: c["Score.finalExamScore"], weight: c["Score.finalExamWeight"]};
            sco.final = c["Score.total10"];
            // sco.final4 = c["Score.total4"];
            subj.score = sco;
            result.subjects.push(subj);
            if (subj.id.startsWith("PES") == false) { 
                
                result.sumOfCredits += subj.credits;
                result.totalMark10 += sco.final * subj.credits;
                // result.totalMark4 += sco.final4 * subj.credit;
            } else {
                tmp += subj.credits;
            }
        }
        result.semesterGPA = result.totalMark10 / result.sumOfCredits;
        // result.semesterGPAscale4 = result.totalMark4 / result.sumOfCredits;
        result.cnt = result.sumOfCredits;
        result.sumOfCredits += tmp;
        return result;

    } catch (err) {
        return err.message;
    }
    
}

export const getSemesterInfoById = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let {params} = req;
        // let userScores = await 
        let result = await semesterInfoById(user.Id, params.semesterId);
        delete result.cnt;
        delete result.totalMark10;
        res.status(200).json(result);
        
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllSemesterInfo = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let semId = await Semester.findAll({
            raw: true,
        });

        let result = {};
        result.totalGPA = 0.0;
        result.credits = 0;
        // result.totalGPA4 = 0.0;
        result.semesterInfo = [];
        
        result.cnt = 0;
        for (let c of semId) {

            let semInfo = await semesterInfoById(user.Id, c.Id);
            if (! semInfo) {
                continue;
            } else {
                result.credits += semInfo.sumOfCredits;
                result.cnt += semInfo.cnt;
                result.totalGPA += semInfo.totalMark10;
                // result.totalGPA4 += semInfo.totalMark4;
                delete semInfo.cnt;
                delete semInfo.totalMark10;
                if (semInfo.subjects.length > 0) {
                    result.semesterInfo.push(semInfo);
                }
            }
        }
        if (result.cnt > 0) {
            result.totalGPA /= result.cnt;
            // result.totalGPA4 /= result.credit;
        }
        delete result.cnt;
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }

}

export const updateSemesterCourseList = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let semId = req.body.semesterId;
        let subjects = req.body.subjects;
        // console.log(subjects);
        let subjectCodes = subjects.map(c => c.id);
        // console.log(subjectCodes);
        let subjectIds = await Subject.findAll({
            raw:true,
            where: {
                Code: {
                    [Op.in]: subjectCodes
                }
            },
            attributes: ['Id']
        });
        let subIds = subjectIds.map(c => c.Id);
        let userScoreIds = await UserScore.findAll({
            raw: true,
            where: {
                UserId: user.Id,
                SubjectId: {
                    [Op.in]: subIds,
                },
                SemesterId: semId
            }
        });

        for (let c of userScoreIds)

        console.log(userScoreIds);
        
        res.status(200).json("ok");
    } catch(err) {
        res.status(500).json(err.message);
    }
}


export const createCourseScoreInSemester = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let body = req.body;
        const newScore = await Score.create({
            midExamScore: body.midExamScore,
            midExamWeight: body.midExamWeight,
            finalExamScore: body.finalExamScore,
            finalExamWeight: body.finalExamWeight,

        });
        await newScore.save();
        if (! newScore) {
            res.status(400).json("Cant create new Score");
            return;
        }
        let scoreId = newScore.Id;
        const newUserScore = await UserScore.create({
            UserId: user.Id,
            SubjectId: body.subjectId,
            ScoreId: scoreId,
            SemesterId: body.semesterId
        });
        await newUserScore.save();
        if (! newUserScore) {
            res.status(400).json("Cant create new UserScore");
            return;
        }
        res.status(200).json("Create successfully, new userScore" );
    } catch(err) {
        res.status(500).json(err.message);
    }
}

export const deleteCourseScoreInSemesterById = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let {params} = req;
        let curUserScore = await UserScore.findOne({
            where: {Id: params.userScoreId}
        });
        if (! curUserScore) {
            res.status(404).json("Not found");
        }
        else if (curUserScore.UserId != user.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            await curUserScore.destroy();
            res.status(200).json("Deleted successfully")
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const updateCourseScoreInSemesterById = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let {params} = req;
        let curUserScore = await UserScore.findOne({
            where: {Id: params.userScoreId}
        });
        if (! curUserScore) {
            res.status(404).json("Not found");
        }
        else if (curUserScore.UserId != user.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            let curScore = await Score.findOne({
                where: {
                    Id: curUserScore.ScoreId
                }
            });
            /// Update curScore

            curScore.set({
                midExamScore: (! req.body.midExamScore) ? curScore.midExamScore: req.body.midExamScore,
                finalExamScore: (! req.body.finalExamScore) ? curScore.finalExamScore: req.body.finalExamScore,
                midExamWeight: (! req.body.midExamWeight) ? curScore.midExamWeight: req.body.midExamWeight,
                finalExamWeight: (! req.body.finalExamWeight) ? curScore.finalExamWeight: req.body.finalExamWeight,
                
            })
            await curScore.save();

            curUserScore.set({
                SemesterId: (! req.body.semesterId) ? curUserScore.SemesterId : req.body.SemesterId,
                SubjectId: (! req.body.subjectId) ? curUserScore.SubjectId : req.body.subjectId,
            })

            await curUserScore.save();

            res.status(200).json("Update successfully")
        }
 

    } catch (err) {
        res.status(500).json(err.message);
    }
}

export function calGPA(listOfSubjects) {
    let total = 0.0;
    let credits = 0;
    for (let c of listOfSubjects) {
        if (c.id.startsWith("PES")) continue;
        credits += c.credits;
        total += c.score.final * credits;
    }
    if (credits == 0) return 0;
    return (total / credits);
}

export async function getUserGPAById(id) {
    let totalScore = await UserScore.findAll({
        raw: true,
        where: {
            UserId: id
        },
        include: [Score, Subject],
        attributes: ['Subject.Credit', 'Score.total10', 'Score.total4']
    });
    let total10 = 0.0;
    let total4 = 0.0;
    let cres = 0;
    for (let c of totalScore) {
        
        total10 += c.total10 * c.Credit;
        total4 += c.total4 * c.Credit;
        cres += c.Credit;
    }
    if (cres == 0) {
        return {credits: 0, gpa10: 0, gpa4: 0};
    }
    else return {credits: cres, gpa10: (total10/cres), gpa4: (total4/cres)};
}

export const getUserGPA = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let result = await getUserGPAById(user.Id);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err.message);
    }
}
