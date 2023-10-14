
import Post from "../models/PostModel.js"
import User from "../models/UserModel.js";
import Like from "../models/LikeModel.js";

// /home returns an array of post objects from user following
/* post: {
        user: author id,
        username: author username,
        profilePicture: author profile pic,
        postId: post id,
        postMedia: post media url,
        description: post description,
        likes: post likes,
        posted: post creation date
}
*/
export const FetchUserFeed = async (req, res) => {
    try {
        const user = await User.findById(req.user).populate('following', ['_id', 'username', 'profilePicture', 'posts']).exec()
        let feedPosts = [];
        for (let i=0; i < user.following.length; i++) {

            for (let j=0; j < user.following[i].posts.length; j++) {
                let postObj = await Post.findById(user.following[i].posts[j]._id)
                console.log(postObj)
                let post = {
                    user: user.following[i]._id,
                    username: user.following[i].username,
                    profilePicture: user.following[i].profilePicture,
                    postId: postObj._id,
                    media: postObj.media,
                    description: postObj.description,
                    likes: postObj.likes,
                    posted: postObj.createdOn
                    //Add comments in future
                }
                // console.log(post)
                feedPosts.push(post)
            }
        }

        feedPosts.sort((a,b) => {
            return b.createdOn - a.createdOn
        })
       
        return res.status(200).json({feedPosts})

    } catch(error) {
        console.log(error)
        return res.status(500).json({message: 'An error occured fetching user feed', error: error})
    }
}


export const likePost = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (!user) {
            console.log('User not found, please log in')
        }

        const post = await Post.findById(req.body.postId)
        console.log(post)
        if  (!post) {
            console.log("Post does not exist")
            return res.status(500).json({message: "Id given does not match any post in the DB"})
        }

        //Create the like document
        const like = await Like.create({
            user: user,
            post:post
        })

        //Add the like document reference to the post object
        //We can still grab no. of likes by a count of documents related
        console.log('like:', like)
        console.log('post:', post.likes)
        
        post.likes.push(like)
        await post.save()

        return res.status(200).json({message: 'Post liked successfully', post})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error liking post'})
    }
}

export const unlikePost = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (!user) {
            console.log('User not found, please log in')
        }

        const post = await Post.findById(req.post)
        if  (!post) {
            console.log("Post does not exist")
            return res.status(500).json({message: "Id given does not match any post in the DB"})
        }

        //Create the like document
        const like = await Like.findOneAndDelete({user: user._id, post: post._id})

        //Add the like document reference to the post object
        //We can still grab no. of likes by a count of documents related
        post.likes.push(like)
        await post.save()

        return res.status(200).json({message: 'Post liked successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error liking post'})
    }
}