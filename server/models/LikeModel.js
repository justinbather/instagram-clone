import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({ 
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    dateLiked : {
        type: Date,
        default: Date.now
    },

    
})

const Like = mongoose.model('Like', LikeSchema)

export default Like;