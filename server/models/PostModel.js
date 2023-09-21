import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },

    media: String,
    author: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now
    },


});

const Post = mongoose.model('Post', PostSchema)

export default Post;