import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"

import {uploadImage, uploadProfilePicture} from './ImageController.js'




// Handle creating of post
export const CreatePost = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.json({message: "user does not exist. Sign in.", error: error})
        }
        
        const mediaUrl = await uploadImage(req, res, async (error) => {
                if(error) {
                    console.log('promise rejecting')
                    return res.status(500).json({message: 'error uploading'})

                } else {
                    console.log('promise resolved')
                    console.log(mediaUrl)
                    return res
                }
            })
        
            const uploadedMediaUrl = await mediaUrl
            const newPost = new Post({
                description: req.body.description,
                author: user._id,
                media: uploadedMediaUrl
            })
            
            const post = await newPost.save()
            user.posts.push(post._id)
            await user.save()
            return res.status(200).json({message:'Post created successfully', post})

        

        
    } catch(error) {
        console.error('Error creating post:', error)
        return res.status(500).json({message: "error uploading", error: error})
    }
    

};


// Fetches User Profile
export const FetchProfile = async (req, res) => {
    
    const usernameParam = req.params['username']
    if (usernameParam) {
        try {
            const userProfile = await User.findOne({username: usernameParam});
            const user = await User.findById(req.user);

            if (!userProfile) {
                return res.status(400).json({message:'Could not find user'})
            }
        
            const posts = await Post.find({author: userProfile._id})
            const followingThisUser = user.following.includes(userProfile._id)
            
            console.log('following '+ followingThisUser)
            return res.status(200).json({user:{ username: userProfile.username, 
                                                    bio: userProfile.bio, profilePicture: userProfile.profilePicture,
                                                    posts: userProfile.posts, following: userProfile.following,
                                                    followers: userProfile.followers}, posts, followingThisUser})
        } catch (error) {
            return res.status(400).json({message:'Could not find posts'})
        }

        } else {

            try {
                const user = await User.findById(req.user);
                console.log(user)
                if (!user) {
                    return res.status(404).json({message:'User does not exist'})
                }

                const posts = await Post.find({author: user._id})
                return res.status(200).json({user:{ username: user.username, 
                                                email: user.email, bio: user.bio, 
                                                profilePicture: user.profilePicture,
                                                posts: user.posts, following: user.following,
                                                followers: user.followers}, posts})
        
                
            } catch(err) {
                return res.status(400).json({message: 'Error fetching profile', err})
            }
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

// /profile/following: Fetches the users following users
// Returns following users username, bio, profilePicture, _id
export const fetchFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (user) {
            const following = await User.findById(req.user).populate('following', ['_id','username', 'bio', 'profilePicture']).exec()
            console.log(following)
            return res.status(200).json({success: true, following})
        }
    } catch(error) {
        console.log('Error fetching following users', error)
        return res.status(500).json({message:'Error fetching following users', error: error})
    }
}

//* Handle Following user
export const FollowUser = async (req, res) => {
    try {
        const {usernameParam} = req.params['username']
        const user = await User.findById(req.user)


        const followUser = await User.findOne({username: req.body.username})
        if (!user) { 
            console.log('Please log in')
            return res.status(400).json({message:'User not logged in'})
         }
         if (!followUser) {
            console.log('User does not exist')
            return res.status(400).json({message: 'Could not find user with posted username, user does not exist'})
         }

        if (user.following.includes(followUser._id)) {
            console.log('You already follow this user')
            res.status(400).json({message: 'user already follows posted user'})
        } else {
            user.following.push(followUser)
            user.save()
            followUser.followers.push(user)
            followUser.save()

            return res.status(200).json({message: `${user.username} followed ${followUser.username}`})
        }

    } catch(err) {
        return res.status(400).json({message: "User must be logged in to follow another user", error: err})
    }
};


//todo: Test this 
export const unfollowUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        const unfollowUser = await User.findOne({username: req.body.username}) //Username posted in request body
         if (!user) { 
            console.log('Please log in')
            return res.status(400).json({message:'User not found when trying to find user in DB to unfollow'})
         }
         if (!unfollowUser) {
            console.log('User does not exist')
            return res.status(400).json({message: 'Could not find user with posted username, user does not exist'})
         }
         //User and unfollowUser exists
         if (user.following.includes(unfollowUser._id)) {
            //Need to remove both users from eachothers following and followers
            const userIndex = user.following.indexOf(unfollowUser._id)
            user.following.splice(userIndex, 1) // Removes id inplace, does not create a shallow copy
            await user.save()
            const unfollowUserIndex = unfollowUser.followers.indexOf(user._id)
            unfollowUser.followers.splice(unfollowUserIndex, 1)
            await unfollowUser.save()
            return res.status(200).json({message: 'Successfully unfollowed user', user: user, unfollowed: unfollowUser})
         }
            
         } catch(error) {
            console.log(error)
            return res.status(500).json({message: "An error occured when attempting to unfollow a user", error: error})
         }
    };


//!deprecated
export const HomeFeed = async (req, res) => {
    try {

        //const user = await User.findOne()
        const user = await User.findById(req.user).populate('following', 'username') // Populate the 'following' field and select only the 'username' field
        .exec();
      
        if (user) {
        const allUsers = await User.find() //Fetch all users
        //Map through populated user.following array and grab the usernames, putting tshem into an array
        const followingUsernames = user.following.map((followedUser) => followedUser.username);

            return res.status(200).json({following: followingUsernames, users: allUsers, user})
        }
    } catch (err) {
        return res.status(400).json({message: "User must be logged in"})
    }
}