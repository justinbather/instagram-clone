import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"

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
                let post = {
                    user: user.following[i]._id,
                    username: user.following[i].username,
                    profilePicture: user.following[i].profilePicture,
                    postId: postObj._id,
                    postMedia: postObj.media,
                    description: postObj.description,
                    likes: postObj.likes,
                    posted: postObj.createdOn
                    //Add comments in future
                }
                feedPosts.push(post)
            }
        }
       
        return res.status(200).json({feedPosts})

    } catch(error) {
        console.log(error)
        return res.status(500).json({message: 'An error occured fetching user feed', error: error})
    }
}