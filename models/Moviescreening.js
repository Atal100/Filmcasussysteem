const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoviescreeningSchema = new Schema({
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    halls: {
        type: Schema.Types.ObjectId,
        ref: 'Halls'
    }
})