import mongoose from "mongoose";
import {UserSchema } from "../schema/user.schema.js";

const userModel = mongoose.model("UserSchema", UserSchema)

// functional
export function findUser(username) {
    return userModel.findOne({
        username: username
    }).exec()
}

// functional
export function createUser(user) {
    return userModel.create(user);
}

// functional
export function getAllUsers() {
    return userModel.find().exec();
}


export function getAllSortedUsers(){
    return userModel.find().sort({ wins: -1, losses: 1, username: 1 }).exec();
}

export async function updateWins(username) {
    const user = await userModel.findOne({username: username});
    console.log(user)
    user.wins++;
    await user.save();
    return user;    
}

export async function updateLosses(username) {
    const user = await userModel.findOne({username: username});
    user.losses++;
    await user.save();
    return user;
}

export async function updatePassword(username, newPassword) {
    const user = await userModel.findOneAndUpdate({username: username}, {password: newPassword},)
    return user;
}

export function deleteAllUsers(){
    userModel.deleteMany().exec();
}