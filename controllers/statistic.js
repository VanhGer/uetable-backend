import { getUserGPAById } from "./score.js";
import User from "../models/user.js"
import UserScore from "../models/userScore.js";
import Score from "../models/score.js";
import { Op } from "sequelize";

/** GPA */

async function calAverageGpa(listOfStudents) {
    let ans;
    let gpa10 = 0, gpa4 = 0, num = 0;
    for (let student of listOfStudents) {
        let cur = await getUserGPAById(student.Id);
        
        if (cur.credits == 0) {
            continue;
        }  else {
            num++;
            gpa10 += cur.gpa10;
            gpa4 += cur.gpa4;
        }
    }
    if (num == 0) ans = {students: 0, gpa10: 0, gpa4: 0};
    else {
        ans = {students: num, gpa10: (gpa10/num), gpa4: (gpa4/num)};
    }
    return ans;
}

export const getAverageGpaOfAll = async (req, res) => {
    try {   
        let students = await User.findAll({
            raw: true
        });
        let ans = await calAverageGpa(students);
        res.status(200).json(ans);
    
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getAverageGpaBySubjectId = async(req, res) => {
    try {
        let {params} = req;   
        let scores = await UserScore.findAll({
            raw: true,
            where: {
                SubjectId: params.subjectId
            },
            include: [Score],
            attributes: ['Score.total10', 'Score.total4']
        });
       
        let ans;
        let gpa10 = 0, gpa4 = 0, num = 0;
        for (let score of scores) {
            num++;
            gpa10 += score.total10;
            gpa4 += score.total4;
            
        }
        if (num == 0) ans = {students: 0, gpa10: 0, gpa4: 0};
        else {
            ans = {students: num, gpa10: (gpa10/num), gpa4: (gpa4/num)};
        }
        res.status(200).json(ans);
    
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAverageGpaBySchoolYear = async(req, res) => {
    try {   
        let {params} = req;
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${params.startId}%`
                }
            }
        });
        // console.log("33", students);
        let ans = await calAverageGpa(students);
        res.status(200).json(ans);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}

/** Credits */

async function calAverageCredit(listOfStudents) {
    let ans;
    let credit = 0, num = 0;
    for (let student of listOfStudents) {
        let cur = await getUserGPAById(student.Id);
        
        if (cur.credits == 0) {
            continue;
        }  else {
            num++;
            credit += cur.credits
        }
    }
    if (num == 0) ans = {students: 0, credit: 0};
    else {
        ans = {students: num, credits: credit / num};
    }
    return ans;
}

export const getAverageCreditBySchoolYear = async(req, res) => {
    try {   
        let {params} = req;
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${params.startId}%`
                }
            }
        });
        // console.log("33", students);
        let ans = await calAverageCredit(students);
        res.status(200).json(ans);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}