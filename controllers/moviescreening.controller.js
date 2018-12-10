const movieScreening = require('../models/Moviescreening.js');
const Error = require("../models/ApiError");


module.exports = {
    createmovieScreening(req, res, next) {
        const properties = req.body

        movieScreening.create(properties)
            .then(moviescreening => res.status(201).json({
                "message": "Movie has been succesfully created.",
                "code": 201,
                "movie": moviescreening
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 500 }))
            })
    },

    getmovieScreening(req, res, next) {
        const moviescreeningId = req.params.id

        Movie.findById(moviescreeningId)
            .then((moviescreening) => {
                if (moviescreening !== null) {
                    res.status(200).json({
                        moviescreening
                    })
                } else {
                    next(new Error('Movie not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Movie not found, wrong identifier', 422))
            })
    },
    getallMoviesScreenings(req, res, next) {
        movieScreening.find({})
            .then((moviescreenings) => {
                res.status(200).json({
                    moviescreenings
                })
            })
            .catch(() => {
                next(new Error({ message: 'Movies not found, no movies have been posted yet', code: 404 }))
            })
    },
    updatemovieScreening(req, res, next) {
        const moviescreeningId = req.params.id
        const newbody = req.body

        movieScreening.update(newbody)
            .then(moviescreening => res.status(201).json({
                "message": "Movie has been updated.",
                "code": 201,
                "movie": Moviescreening
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 422 }))
            })
    },

    deletemovieScreening(req, res, next) {
        const moviescreeningId = req.params.id

        movieScreening.findOneAndDelete({ _id: moviescreeningId })
            .then(() => res.status(200).json({
                "message": "Movie has been deleted",
                "code": 200,
                "moviesId": moviescreeningId
            }))
            .catch(() => {
                next(new Error('Movie not found, wrond identifier.', 422))
            })
    }
}