import mongoose from "mongoose";
import bycrypt from "bycrypt";
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
        const salt = await bycrypt.gensalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
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

}
export const signOut = async (re, res, next) => {

}
