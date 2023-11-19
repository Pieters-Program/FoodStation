import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://www.advancedsec.com/wp-content/uploads/2018/11/profile-blank.png'
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;