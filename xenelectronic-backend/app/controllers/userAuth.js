const response = require("../helpers/response");
const responseError = require("../helpers/response-error");
const User = require("../models/user")
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    signup: async (req, res) => {
        try {
            if (!req.body.email) return res.status(200).json(responseError(400, 'EMAIL CANNOT BE EMPTY'))
            if (!req.body.username) return res.status(200).json(responseError(400, 'USERNAME CANNOT BE EMPTY'))
            if (!req.body.phoneNumber) return res.status(200).json(responseError(400, 'PHONE NUMBER CANNOT BE EMPTY'))
            if (!req.body.password) return res.status(200).json(responseError(400, 'PASSWORD CANNOT BE EMPTY'))  
            const phoneNumber =
                req.body.phoneNumber.substr(0, 3) === '+62' ? req.body.phoneNumber.substr(3) :
                    req.body.phoneNumber.substr(0, 2) === '62' ? req.body.phoneNumber.substr(2) :
                        req.body.phoneNumber.substr(0, 2) === '08' ? req.body.phoneNumber.substr(1) :
                            req.body.phoneNumber.substr(0, 1) === '8' ? req.body.phoneNumber.substr(0) : null
            if (!phoneNumber) return res.status(200).json(responseError(400, 'PHONE NUMBER FORMAT WRONG'))
            const isFoundEmail = await User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } })
            if (isFoundEmail) return res.status(200).json(responseError(400, 'EMAIL IS ALREADY USED'))
            const isFoundUsername = await User.findOne({ username: { $regex: new RegExp(req.body.username, 'i') } })
            if (isFoundUsername) return res.status(200).json(responseError(400, 'USERNAME IS ALREADY USED'))
            const isFoundPhoneNumber = await User.findOne({ phoneNumber: phoneNumber })
            if (isFoundPhoneNumber) return res.status(200).json(responseError(400, 'PHONE NUMBER IS ALREADY USED'))


            const newUser = {
                email: req.body.email,
                username: req.body.username,
                phoneNumber: phoneNumber,
                password: bycript.hashSync(req.body.password, 10)
            }
            const newUserRes = await User.create(newUser)
            const userValue = {
                _id: newUserRes._id,
                email: newUserRes.email,
                username: newUserRes.username,
            }
            const token = jwt.sign(
                { user: userValue },
                process.env.jwtKey,
                { expiresIn: '720h' })
            return res.status(200).json(response({ user: userValue, token: token }));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    login: async (req, res) => {
        try {
            const isUserFound = await User.findOne({
                $or: [
                    {
                        email: { $regex: new RegExp(req.body.usernameOrEmail, 'i') }
                    },
                    {
                        username: { $regex: new RegExp(req.body.usernameOrEmail, 'i') }
                    }]
            })
            if (!isUserFound) return res.status(200).json(responseError(400, 'Your username/email/password might be not match'))
            
            const isPassTrue = await Promise.resolve(bycript.compare(req.body.password, isUserFound.password))
            if (!isPassTrue) return res.status(200).json(responseError(400, 'Your username/email/password might be not match'))

            const userValue = {
                _id: isUserFound._id,
                email: isUserFound.email,
                username: isUserFound.username,
            }
            const token = jwt.sign(
                { user: userValue },
                process.env.jwtKey,
                { expiresIn: '720h' })
            return res.status(200).json(response({ user: userValue, token: token }));

        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    }

}