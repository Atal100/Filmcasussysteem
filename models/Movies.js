const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        unique: true
    },
    time: {
        type: String,
        required: [ture, 'Time is required.']
    },
    language: {
        type: String,
        required: [true, 'Language is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    genre: [{
        type: String,
        required: [true, 'Genre is required.']
    }]


});
const Movies = mongoose.model('movies', MovieSchema);

module.exports = Movies;
