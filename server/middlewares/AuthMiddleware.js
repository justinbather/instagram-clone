import User from "../models/UserModel.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const userVerification = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.json({status: false})
    } // replace token with dotenv import token
    jwt.verify(token, 'dksiwmc34m5h9rm53hdswxfki8736225', async (err, data) => {
        if (err) {
            return res.json({status: false})
        } else {
            const user = await User.findById(data.id)
            if (user) {
                console.log("user verified")
                req.user = user.username
                return next()
            } else {
                return res.json({ status: false})
            }
        }
    })
}