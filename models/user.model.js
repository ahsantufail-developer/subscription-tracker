import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 30,
        lowercase: true,
        required: [true, "Email address is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    }
}, {
    Timestamp: true
});

const User = mongoose.model('User', userSchema);

export default User;