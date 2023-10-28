import User from "../models/user.js"
import Authentication from '../middlewares/authentication.js'
import UserDTO from '../dto/users.js'
import UserHandleDTO from '../dto/userHandle.js'
import { Op } from 'sequelize'


export const addUser = async (req, res) => {
    try {
        const { body } = req

        const duplicateEmail = await User.findOne({
            where: {
                Email: body.email,
            },
        })

        if (duplicateEmail) {
            res.status(409).send({ error: 'Email has already been taken' })
            return
        }

        const createUser = await User.create({
            Name: body.name,
            Email: body.email,
            PasswordHash: body.password,
        })
        const authToken = Authentication.generateAuthToken(createUser)
        res.status(201).send({
            message: 'User successfully created',
            authToken,
            Email: createUser.Email,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserHandles = async (req, res) => {
    try {
        const decodedUser = res.locals.decodedUser
        console.log(decodedUser)

        // Find all users which are not equal to userId
        const users = await User.findAll({
            where: {
                Id: {
                    [Op.ne]: decodedUser.Id,
                },
            },
        })

        // console.log(users)

        const emails = users.map((user) => UserHandleDTO.convertToDto(user))

        res.status(200).send({
            emails,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


export const getUsersById = async (req, res) => {
    try {
        const { params } = req
        // console.log(params)
        const user = await User.findOne({
            where: {
                id: params.id,
            },
        })
        if (!user) {
            res.status(404).send({
                error: `User '${params.id}' not found`,
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
                Email: body.email,
            },
        })

        if (!user || !user.validatePassword(body.password)) {
            res.status(401).send({
                error: 'Incorrect email or password',
            })
            return
        }

        const authToken = Authentication.generateAuthToken(user)
        res.status(200).send({
            message: 'Authentication successful',
            authToken,
            email: user.email,
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

        const updatedUser = await User.update(
            {
                Name: body.name,
                Avatar: body.avatar,
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