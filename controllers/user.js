import User from "../models/user.js"
import Auth from "../models/auth.js"
import Authentication from '../middlewares/authentication.js'
import UserDTO from '../dto/users.js'
import UserHandleDTO from '../dto/userHandle.js'
import { Op } from 'sequelize'
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {
    try {
        const { name, studentid, password } = req.body;

        const duplicateStudentId = await User.findOne({
            where: {
                StudentId: studentid,
            },
        })

        if (duplicateStudentId) {
            res.status(409).send({ error: 'StudentId has already been taken' })
            return
        }

        const token = jwt.sign({ name, studentid, password }, process.env.JWT_SECRET, { expiresIn: '30m' });
        const output = `
        <h2>Please click on below link to activate your account</h2>
        <p>${process.env.CLIENT_URL}/api/activate/${token}</p>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailName = studentid + "@" + process.env.EMAIL_ORG

        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: mailName, // receiver email
            subject: "Account Verification on UETable", // Subject line
            text: output,
            html: output,
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Mail sent : %s', info.response);
            }
        })

        res.status(201).send({
            message: 'Email send successfully',
            StudentId: studentid,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const activateAccount = async (req, res) => {
    const token = req.params.token;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const { name, studentid, password } = decodedToken;
        const duplicateStudentId = await User.findOne({
            where: {
                StudentId: studentid,
            },
        })

        if (duplicateStudentId) {
            res.status(409).send({ error: 'StudentId has already been taken' })
            return
        }
        const createUser = await User.create({
            Name: name,
            StudentId: studentid,
            PasswordHash: password,
        })
        const salt = bcrypt.genSaltSync(10)
        createUser.PasswordHash = bcrypt.hashSync(createUser.PasswordHash, salt)
        createUser.save()
        res.status(201).send({
            message: 'User successfully created',
            StudentId: createUser.StudentId,
        })
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