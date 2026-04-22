import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //logic to create a new user
        const { name, email, password } = req.body;
        //check if user already exists 
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create the user
        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });
        //generate JWT token
        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        //commit the transaction
        await session.commitTransaction();
        session.endSession();
        //send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0]

            }
        });





    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        //compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        //generate JWT token 
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        //send mesaage 
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                user
            }
        })




    } catch (error) {
        next(error);
    }

}
export const signOut = async (re, res, next) => {

}
