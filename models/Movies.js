const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        unique: true
    },
    time: {
        type: Number,
        trim: true,
        min: [60, "Movie needs to be longer"],
        max: [300,"There is no movie longer than this"], 
        required: [true, 'Time is required.']
    },
    language: {
        type: String,
        trim: true,
        required: [true, 'Language is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    genre: {
        type: String,
        trim: true,
        required: [true, 'Genre is required.']
    }


});
const Movies = mongoose.model('Movies', MovieSchema);

module.exports = Movies;
