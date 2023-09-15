import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"


export const CreatePost = async (req, res, next) => {
    
    try {
        const user = await User.findOne(req.user.username);
        if (user) {
            const newPost = {
                description: req.body.description,
                author: user._id,
            };

            const post = await Post.create(newPost)

            user.posts.push(post)
            user.save()
            
            return res.status(201).json({message: "Post created", success: true, post})
            
          
        }
       
    } catch(error) {
        return res.json({message: "user does not exist. Sign in.", error: error})
    }
    

};

export const FetchProfile = async (req, res) => {
    try {
        const user = await User.findOne(req.user.username);
        if (user) {
            const posts = await Post.find({author: user._id})
            return res.status(201).json({user:{ username: user.username, email: user.email, posts: user.posts}, posts})
        }
    } catch(err) {
        return res.status(400).json({message: 'User not found'})
    }
};

export const FollowUser = async (req, res) => {
    try {
        const user = await User.findOne(req.user.username)

        const followUser = await User.findOne({username: req.body.username})
        if (user) {
            if (followUser) {
                

                console.log(followUser)
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

        const user = await User.findOne(req.user.username)
        if (user) {
            return res.status(200).json({following: user.following})
        }
    } catch (err) {
        return res.status(400).json({message: "User must be logged in"})
    }
}