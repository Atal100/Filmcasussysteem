const Movie = require('../models/Movie')

module.exports = {
    createMovie(req, res, next) {
        const properties = req.body

        Movie.create(properties)
            .then(movie => res.status(201).json({
                "message": "Movie has been succesfully created.",
                "code": 201,
                "movie": movie
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 500 }))
            })
    },

    getMovie(req, res, next) {
        const moviesId = req.params.id

        Movie.findById(moviesId)
            .then((movie) => {
                if (movie !== null) {
                    res.status(200).json({
                        movie
                    })
                } else {
                    next(new Error('Movie not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Movie not found, wrong identifier', 422))
            })
    },
    getAllMovies(req, res, next) {
        Movie.find({})
            .then((movies) => {
                res.status(200).json({
                    movies
                })
            })
            .catch(() => {
                next(new Error({ message: 'Movies not found, no movies have been posted yet', code: 404 }))
            })
    },
    updateMovie(req, res, next) {
        const movieId = req.params.id
        const newbody = req.body

        Movie.update(newbody)
            .then(movie => res.status(201).json({
                "message": "Movie has been updated.",
                "code": 201,
                "movie": movie
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 422 }))
            })
    },

    deleteMovie(req, res, next) {
        const moviesId = req.params.id

        Movie.findOneAndDelete({ _id: moviesId })
            .then(() => res.status(200).json({
                "message": "Movie has been deleted",
                "code": 200,
                "moviesId": moviesId
            }))
            .catch(() => {
                next(new Error('Movie not found, wrond identifier.', 422))
            })
    }
}