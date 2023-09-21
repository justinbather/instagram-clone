import AWS from 'aws-sdk';
import multer from 'multer';
import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"
import dotenv from 'dotenv'
import path from 'path'


dotenv.config()

const s3 = new AWS.S3();

s3.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No image provided'})
        }

        const params = {
            Bucket: 'justin-ig-clone-storage',
            Key: `${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();
        const mediaUrl = uploadResponse.Location

        const user = await User.findOne(req.user.username);

        const newPost = {
            description: req.body.description,
            author: user._id,
            media: mediaUrl
        }

        const post = await Post.create(newPost)
        user.posts.push(post)
        user.save()




        //Returns the location url for the image with .Location
        return res.status(201).json({message: "Image uploaded", post})
    } catch (error) {
        console.error('Error uploading file in ImageController')
        return res.status(500).json({error: 'Server error uploading to aws'})
    }
};



export const uploadProfilePicture = async (req, res) => {

    try{
        if (!req.file) {
            return res.status(400).json({message: 'No profile picture given'})
        }

        const params = {
            Bucket: 'justin-ig-clone-storage',
            Key: `${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();
        const update = uploadResponse.Location

        const updatedUser = await User.findByIdAndUpdate(req.user, {profilePicture: update})

        return res.status(202).json({message: 'Updated profile picture', update})

    } catch(error) {
        console.log(error)
        return res.status(500).json({message: 'Error updating profile picture', error})
        
    }
}