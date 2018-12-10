const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HallsSchema = new Schema({
    hall: {
        type: Number,
        min: [1,"There needs to be at least one Hall"],
        max: [10,"This is to much"],
        required: [true, 'Hall is required'],
        unique: true
    },
    seats: {
        type: Number,
        min: [1, "There needs to be at least one seat"],
        max: [100, "This is to much"],
        required: [true, 'Seat is required'],
    },
})

module.exports = mongoose.model('halls', HallsSchema)