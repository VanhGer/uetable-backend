import { getUserGPAById } from "./score.js";
import User from "../models/user.js"
import Subject from "../models/subject.js";
import UserScore from "../models/userScore.js";
import Score from "../models/score.js";
import { Op } from "sequelize";

/** GPA */

async function calAverageGpa(listOfStudents) {
    try {
        let ans;
        let gpa10 = 0.0, gpa4 = 0.0, num = 0;
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
    } catch (err) {
        throw err;
    }
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

async function calAverageCredit(listOfStudents, semId = null) {
    try {
        let credits = 0;
        let num = listOfStudents.length;
        
        for (let student of listOfStudents) {
            let whereCondition = {};
            if (semId === null) {
                whereCondition = {
                    UserId: student.Id
                }
            } else {
                whereCondition = {
                    UserId: student.Id,
                    SemesterId: semId,
                }
            }
            let totalCre = await UserScore.findAll({
                raw: true,
                where: whereCondition,
                include: [Subject],
                attributes: ['Subject.Credit']
            });
            if (totalCre.length == 0) {
                num--;
            }
            // console.log(totalCre);
            for (let c of totalCre) {
                credits += c.Credit;
            }
        }
        if (num == 0) return {students: 0, credits: 0};
        return {students: num, credits: (credits / num)};
    } catch (err) {
        throw err;
    }
    
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

export const getCreditRangeInSemester = async(req, res) => {
    try {   
        let semId = req.body.semesterId;
        let schoolYear = req.body.year;
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${schoolYear}%`
                },
            }
        });

        // console.log(students.length);
        let t10 = 0, t15 = 0, t20 = 0, t25 = 0, t30 = 0; 
        for (let student of students) {
            // console.log(student);
            let totalCre = await UserScore.findAll({
                raw: true,
                where: {
                    UserId: student.Id,
                    SemesterId: semId,
                },
                include: [Subject],
                attributes: ['Subject.Credit']
            });
            // console.log(totalCre.length);
            let cur = 0;
            for (let c of totalCre) {
                cur += c.Credit;
            }
            // console.log(cur);
            if (cur <= 10) t10++;
            else if (cur <= 15) t15++;
            else if (cur <= 20) t20++;
            else if (cur <= 25) t25++;
            else t30++; 
        }
        // console.log(t10, t15, t20, t25, t30);
        let result = [];
        result.push({type: "0-10", value: t10});
        result.push({type: "10-15", value: t15});
        result.push({type: "15-20", value: t20});
        result.push({type: "20-25", value: t25});
        result.push({type: "25-30", value: t30});
        res.status(200).json(result);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}

