import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"

import {uploadImage, uploadProfilePicture} from './ImageController.js'




// Handle creating of post
export const CreatePost = async (req, res, next) => {
    try {
        const user = await User.findOne(req.user.username);
        if (!user) {
            return res.json({message: "user does not exist. Sign in.", error: error})
        }
        //uploadImage handles post creation, should refactor this
        uploadImage(req, res, async(error) => {
            if (error) {
                return res.status(500).json({message: 'Error uploading image'})
            }
        });
    } catch(error) {
        console.error('Error creating post:', error)
        return res.status(500).json({message: "error uploading", error: error})
    }
    

};


// Fetches User Profile
export const FetchProfile = async (req, res) => {
    try {
       
        const user = await User.findById(req.user);
        console.log(user)
        if (user) {
            const posts = await Post.find({author: user._id})
            return res.status(200).json({user:{ username: user.username, 
                                            email: user.email, bio: user.bio, 
                                            profilePicture: user.profilePicture,
                                            posts: user.posts, following: user.following,
                                            followers: user.followers}, posts})
        }
    } catch(err) {
        return res.status(400).json({message: 'Error fetching profile', err})
    }
};

export const UpdateProfile = async (req, res) => {
    try {
        
        if (req.file) {
            uploadProfilePicture(req, res, async(error) => {
                if (error) {
                    return res.status(500).json({message: 'Error uploading image'})
                }
            });
        } else {
            const update = req.body;
            const user = await User.findByIdAndUpdate(req.user, update)
            return res.status(202).json({message: 'User updated', user, update})
        }
        
        } catch(error) {
            return res.status(500).json({message: 'Error updating user', error})
    }
};

// Handle Following user
export const FollowUser = async (req, res) => {
    try {
        const user = await User.findOne(req.user.username)

        const followUser = await User.findOne({username: req.body.username})
        if (user) {
            if (followUser) {


                user.following.push(followUser)
                user.save()
                followUser.followers.push(user)
                followUser.save()
                
                return res.status(200).json({message: `${user.username} followed ${followUser.username}`})
            } else {
                return res.status(400).json({message: "user not found"})
            }
            
        }
    } catch(err) {
        return res.status(400).json({message: "User must be logged in to follow another user", error: err})
    }
};

export const HomeFeed = async (req, res) => {
    try {

        //const user = await User.findOne()
        const user = await User.findOne(req.user.username).populate('following', 'username') // Populate the 'following' field and select only the 'username' field
        .exec();
      
        if (user) {
        const allUsers = await User.find() //Fetch all users
        //Map through populated user.following array and grab the usernames, putting tshem into an array
        const followingUsernames = user.following.map((followedUser) => followedUser.username);

            return res.status(200).json({following: followingUsernames, users: allUsers})
        }
    } catch (err) {
        return res.status(400).json({message: "User must be logged in"})
    }
}