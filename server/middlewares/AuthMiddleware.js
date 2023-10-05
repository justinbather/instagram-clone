import User from "../models/UserModel.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const userVerification = (req, res, next) => {
    const token = req.cookies.token
   
    console.log(req.cookies)
    if (!token) {
        console.log('No token in header')
        return res.redirect('/login')
    } // replace token with dotenv import token
    jwt.verify(token, 'dksiwmc34m5h9rm53hdswxfki8736225', async (err, data) => {
        if (err) {
            console.log('failed to verify')
            return res.status(400).json({message: "Failed to verify user", status: false})
        } else {
            const user = await User.findById(data.id)
            if (user) {
                console.log("user verified")
                req.user = user._id
                console.log(req.user)
                return next()
            } else {
                return res.status(400).json({message: "Failed to verify user", status: false})
            }
        }
    })
}