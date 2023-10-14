import User from "../models/UserModel.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const userVerification = (req, res, next) => {
    const token = req.cookies.token
   
    
    if (!token) {
        
        return res.redirect('/login')
    } // replace token with dotenv import token
    jwt.verify(token, 'dksiwmc34m5h9rm53hdswxfki8736225', async (err, data) => {
        if (err) {
            
            return res.status(400).json({message: "Failed to verify user", status: false})
        } else {
            const user = await User.findById(data.id)
            if (user) {
                
                req.user = user._id
                
                return next()
            } else {
                return res.status(400).json({message: "Failed to verify user", status: false})
            }
        }
    })
}