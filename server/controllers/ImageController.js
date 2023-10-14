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
    console.log(req)
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.file) {
                reject('no image provided')
            }
    
            const params = {
                Bucket: 'justin-ig-clone-storage',
                Key: `${Date.now()}_${req.file.originalname}`,
                Body: req.file.buffer,
            };
    
            const uploadResponse = await s3.upload(params).promise();
            const mediaUrl = uploadResponse.Location
            
            //Returns the location url for the image with .Location
            resolve(mediaUrl);
        } catch (error) {
            console.error('Error uploading file in ImageController')
            reject('Error uploading to AWS')
        }

    })
    
};



export const uploadProfilePicture = async (req, res) => {

    try{
        if (!req.file) {
            reject('No image provided')
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