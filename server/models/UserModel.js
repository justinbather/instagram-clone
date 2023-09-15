import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your emai address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Following'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Followers'
        }
    ],
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
}); //

const User = mongoose.model('User', UserSchema)

export default User;