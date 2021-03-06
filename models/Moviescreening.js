const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoviescreeningSchema = new Schema({
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        unique: true
    },
    halls: {
        type: Schema.Types.ObjectId,
        ref: 'Halls' ,
        unique: true

    }
});

const Moviescreening = mongoose.model('Moviescreening', MoviescreeningSchema);

module.exports = Moviescreening;