import User from "../models/UserModel.js"
import createSecretToken from "../config/SecretToken.js"
import bcrypt from 'bcryptjs';

export const Signup = async (req, res, next) => {
    try {
        const {email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({message:"User Already exists"});
        }
        const user = await User.create({email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res
        .status(201)
        .json({message: "User created and signed in successfully", success: true, user});
        next();
    } catch(error) {
        console.error(error);
    };
};


export const Login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password)
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required'})
        }
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(400).json({ message: 'Incorrect login'})
        }
        const auth = await new Promise((res, rej) => {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    rej(err); 
                } else {
                    console.log(result)
                    res(result);
                }
            })
        }) 
        
       
        if (!auth) {
            return res.status(400).json({ message: "Incorrect email or password"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res.status(201).json({ message: "User logged in successfully", success: true});
        

    } catch(error) {
        console.error(error);
    }
};



