const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minlength: [3, "Too few letters"],
        maxlength: 10,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: [4, "Password needs more letters"],
        required: [true, 'Password is required']
    },
})

module.exports = mongoose.model('user', UserSchema)