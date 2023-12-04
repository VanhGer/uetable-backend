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
        result.semesterGPA = 0.0;
        result.totalMark = 0.0;
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
            subj.id = c['Subject.Id'];
            subj.code = c["Subject.Code"];
            subj.name = c["Subject.Name"];
            subj.credit = c["Subject.Credit"];
            subj.type = "registered";
            subj.semesterId = result.id;
            sco.midTerm = {score: c["Score.midExamScore"], weight: c["Score.midExamWeight"]};
            sco.finalTerm = {score: c["Score.finalExamScore"], weight: c["Score.finalExamWeight"]};
            sco.final = c["Score.total"];
            sco.status = c["Score.Status"];
            subj.score = sco;
            result.subjects.push(subj);
            if (sco.final !== null) { 
                result.sumOfCredits += subj.credit;
                result.totalMark += sco.final * subj.credit;
            } else {
                tmp += subj.credit;
            }
        }
        // for (let c of result.subjects) {
        //     console.log(c.score);
                
        // }
        

        result.semesterGPA = result.totalMark / result.sumOfCredits;
        result.sumOfCredits += tmp;
        // console.log(result);
        
        res.status(200).json(result);
        
    } catch (err) {
        res.status(500).json(err.message);
    }
}