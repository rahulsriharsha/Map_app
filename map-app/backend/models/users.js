const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password1: String,
    password2: String
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;