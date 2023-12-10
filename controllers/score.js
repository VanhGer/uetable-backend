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
        // let subjectCodes = subjects.map(c => c.id);
        // console.log(subjectCodes);
        let subjectInfo = [];
        for (let c of subjects) {
            let cCode = c.id;
            let cInfo = await Subject.findOne({
                raw: true, 
                where: {
                    Code: cCode
                }
            });
            if (cInfo !== null) {
                subjectInfo.push(cInfo);
            }
        }
       
        let subIds = subjectInfo.map(c => c.Id); 
        // console.log(subjects);
        // console.log(subjectInfo);
        // console.log(subIds);
        let userScores = await UserScore.findAll({
            where: {
                UserId: user.Id,
                SubjectId: {
                    [Op.in]: subIds,
                },
                SemesterId: semId
            }, 
        });

        /// delete old scores
        for (let c of userScores) {
            await c.destroy();
        }
        
        /// Add new scores to database
        for (let i = 0; i < subjects.length; i++) {
            let registeredSubject = subjects[i];
            let subInfo = subjectInfo[i];
            const newScore = await Score.create({
                midExamScore: registeredSubject.score.midTerm.score,
                midExamWeight: registeredSubject.score.midTerm.weight,
                finalExamScore: registeredSubject.score.finalTerm.score,
                finalExamWeight: registeredSubject.score.finalTerm.weight,
                total10: registeredSubject.score.final
            });
            await newScore.save(); 

            let scoreId = newScore.Id;
            const newUserScore = await UserScore.create({
                UserId: user.Id,
                SubjectId: subInfo.Id,
                ScoreId: scoreId,
                SemesterId: semId
            });
            await newUserScore.save();

        }

        let newGPA = calGPA(subjects);
        res.status(200).json(`updated successfully, new GPA is: ${newGPA}`);
    } catch(err) {
        res.status(500).json(err.message);
    }
}

function calGPA(listOfSubjects) {
    let total = 0.0;
    let credits = 0;
    for (let c of listOfSubjects) {
        if (c.id.startsWith("PES")) continue;
        credits += c.credits;
        total += c.score.final * c.credits;
    }
    if (credits == 0) return 0;
    return (total / credits);
}

async function calYearGPA(listOfSubjects, semId) {
    let totalScore = await UserScore.findAll({
        raw: true,
        where: {
            UserId: id,
            SemesterId: {
                [Op.ne]: semId
            }
        },
        include: [Score, Subject],
        attributes: ['Subject.Credit', 'Score.total10']
    });
    let total10 = 0.0;
    let cres = 0;
    for (let c of totalScore) {
        if (c.Code.startsWith("PES")) continue;
        total10 += c.total10 * c.Credit;
        cres += c.Credit;
    }
    for (let c of listOfSubjects) {
        if (c.id.startsWith("PES")) continue;
        cres += c.credits;
        total10 += c.score.final * c.credits;
    }
    if (cres == 0) return 0;
    return (total10 / cres);

}

export async function getUserGPAById(id) {
    let totalScore = await UserScore.findAll({
        raw: true,
        where: {
            UserId: id
        },
        include: [Score, Subject],
        attributes: ['Subject.Code','Subject.Credit', 'Score.total10', 'Score.total4']
    });
    let total10 = 0.0, total4 = 0.0;
    let cres = 0;
    let tmp = 0;
    for (let c of totalScore) {
        if (c.Code.startsWith("PES")) {tmp++; continue;}
        total10 += c.total10 * c.Credit;
        total4 += c.total4 * c.Credit;
        cres += c.Credit;
    }
    if (cres == 0) {
        return {credits: 0 + tmp, gpa10: 0, gpa4: 0};
    }
    else return {credits: cres + tmp, gpa10: (total10/cres), gpa4: (total4/cres)};
}

export const getUserGPA = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let result = await getUserGPAById(user.Id);
        delete(result.credits);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err.message);
    }
}
