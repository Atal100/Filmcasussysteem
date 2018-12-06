const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HallsSchema = new Schema({
    hall: {
        type: String,
        required: [true, 'Hall is required'],
        unique: true
    },
})

module.exports = mongoose.model('halls', HallsSchema)