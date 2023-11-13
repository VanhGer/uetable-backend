import User from "../models/user.js"
import Auth from "../models/auth.js"
import Authentication from '../middlewares/authentication.js'
import UserDTO from '../dto/users.js'
import UserHandleDTO from '../dto/userHandle.js'
import { Op } from 'sequelize'
import crypto from crypto
import HTML_TEMPLATE from "./mail-template.js";
import SENDMAIL from "./email.js" 


export const addUser = async (req, res) => {
    try {
        const { body } = req

        const duplicateStudentId = await User.findOne({
            where: {
                StudentId: body.studentid,
            },
        })

        if (duplicateStudentId) {
            res.status(409).send({ error: 'StudentId has already been taken' })
            return
        }

        const createUser = await User.create({
            Name: body.name,
            StudentId: body.studentid,
            PasswordHash: body.password,
        })
        const authToken = Authentication.generateAuthToken(createUser)
        res.status(201).send({
            message: 'User successfully created',
            authToken,
            StudentId: createUser.StudentId,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const emailVerification = async (req, res) => {
    try {
        const { body } = req
        let user = await User.findOne({
            StudentId: body.studentid,
        })

        if (user) 
            return res.status(400).send("User with given email already verification!");

        let token = await new Auth({
            StudentId: body.studentid,
            CodeHash: Math.floor(1000 + Math.random() * 9000),     
        }).save();
        const message = token.CodeHash
        const options = {
            from: "uetable@gmail.com", // sender address
            to: "21020076@vnu.edu.vn", // receiver email
            subject: "UETable Open Now!", // Subject line
            text: message,
            html: HTML_TEMPLATE(message),
        }

        SENDMAIL(options, (info) => {
            console.log("Email sent successfully");
            console.log("MESSAGE ID: ", info.messageId);
        });


    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserHandles = async (req, res) => {
    try {
        const decodedUser = res.locals.decodedUser
        // console.log(decodedUser)

        // Find all users which are not equal to userId
        const users = await User.findAll({
            where: {
                Id: {
                    [Op.ne]: decodedUser.Id,
                },
            },
        })

        // console.log(users)

        const studentids = users.map((user) => UserHandleDTO.convertToDto(user))

        res.status(200).send({
            studentids,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


export const getUsersByStudentId = async (req, res) => {
    try {
        const { params } = req
        // console.log(params)
        const user = await User.findOne({
            where: {
                studentid: params.studentid,
            },
        })
        if (!user) {
            res.status(404).send({
                error: `User '${params.studentid}' not found`,
            })
            return
        }

        const userDTO = await UserDTO.convertToDto(user)
        res.status(200).send(userDTO)
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({
            where: {
                StudentId: body.studentid,
            },
        })

        if (!user || !user.validatePassword(body.password)) {
            res.status(401).send({
                error: 'Incorrect studentid or password',
            })
            return
        }

        const authToken = Authentication.generateAuthToken(user)
        res.status(200).send({
            message: 'Authentication successful',
            authToken,
            studentid: user.studentid,
        })
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const modifyUser = async (req, res) => {
    try {
        const loggedInUser = res.locals.decodedUser
        // console.log(loggedInUser)
        const { body } = req

        // console.log(body)

        const updatedUser = await User.update(
            {
                Name: body.name,
                Avatar: body.avatar,
                Birth: body.birth,  
            },
            { returning: true, where: { Id: loggedInUser.Id } }
        )

        if (updatedUser) {
            res.status(200).send({ message: 'The profile has been updated.' })
        } else {
            res.status(500).send({ error: 'Failed to update the profile.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const loggedInUser = res.locals.decodedUser

        const deleteUser = await User.destroy({
            where: { Id: loggedInUser.Id },
        })

        if (deleteUser !== 0) {
            res.status(200).send({ message: 'The user has been deleted.' })
        } else {
            res.status(500).send({ error: 'Failed to destroy the user.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const { body } = req
        if (body.oldpassword == body.newpassword) {
            res.status(401).send({message: 'The old password and new password are the same.'})
        }

        const user = await User.findOne({
            where: {
                StudentId: body.studentid,
            },
        })

        if (!user || !user.validatePassword(body.password)) {
            res.status(401).send({
                error: 'Incorrect studentid or password',
            })
            return
        }

        const authToken = Authentication.generateAuthToken(user)
        res.status(200).send({
            message: 'Authentication successful',
            authToken,
            studentid: user.studentid,
        })
        const loggedInUser = res.locals.decodedUser
        const updatedUser = await User.update(
            {
                PasswordHash: body.password
            },
            { returning: true, where: { Id: loggedInUser.Id } }
        )
        if (updatedUser) {
            res.status(200).send({ message: 'The password has been updated.' })
        } else {
            res.status(500).send({ error: 'Failed to update the password.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}