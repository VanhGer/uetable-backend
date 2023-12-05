import UserScore from "../models/userScore.js";
import Score from "../models/score.js";
import Subject from "../models/subject.js";
import Semester from "../models/semester.js";
import sequelize from "../database/db.js";

export const getSemesterInfoById = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let {params} = req;
        // let userScores = await 
        let result = {};
        let sem = await Semester.findOne({
            raw: true,
            where: {
                Id: params.semesterId
            }
        });

        if (!sem) {
            res.status(404).json("Semester is not found!");
            return;
        }
        result.id = sem.Id;
        result.title = sem.Name;
        result.subjects = [];
        result.sumOfCredits = 0;
        result.semesterGPAscale10 = 0.0;
        result.semesterGPAscale4 = 0.0;
        let totalMark10 = 0.0;
        let totalMark4 = 0.0
        let data = await UserScore.findAll({
            raw: true,
            where: {
                UserId: user.Id,
                SemesterId: params.semesterId
            },
            include: [Semester, Score, Subject],
        });
        let tmp = 0;
        for (let c of data) {
            let subj = {};
            let sco = {};
            subj.subjectId = c['Subject.Id'];
            subj.userScoreId = c['Id'];
            subj.code = c["Subject.Code"];
            subj.name = c["Subject.Name"];
            subj.credit = c["Subject.Credit"];
            subj.type = "registered";
            subj.semesterId = result.id;

            sco.midTerm = {score: c["Score.midExamScore"], weight: c["Score.midExamWeight"]};
            sco.finalTerm = {score: c["Score.finalExamScore"], weight: c["Score.finalExamWeight"]};
            sco.final10 = c["Score.total10"];
            sco.final4 = c["Score.total4"];
            sco.status = c["Score.Status"];
            subj.score = sco;
            result.subjects.push(subj);
            if (sco.final10 !== null) { 
                result.sumOfCredits += subj.credit;
                totalMark10 += sco.final10 * subj.credit;
                totalMark4 += sco.final4 * subj.credit;
            } else {
                tmp += subj.credit;
            }
        }
        // for (let c of result.subjects) {
        //     console.log(c.score);
                
        // }
        

        result.semesterGPAscale10 = totalMark10 / result.sumOfCredits;
        result.semesterGPAscale4 = totalMark4 / result.sumOfCredits;
        result.sumOfCredits += tmp;
        // console.log(result);
        
        res.status(200).json(result);
        
    } catch (err) {
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
            Status: body.status
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
                Status: (! req.body.status) ? curScore.Status: req.body.status
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
