const Halls = require('../models/Halls')

module.exports = {
    createHall(req, res, next) {
        const properties = req.body

        Halls.create(properties)
            .then(hall => res.status(201).json({
                "message": "Hall has been succesfully created.",
                "code": 201,
                "hall": hall
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 500 }))
            })
    },

    getHall(req, res, next) {
        const hallId = req.params.id

        Halls.findById(hallId)
            .then((hall) => {
                if (hall !== null) {
                    res.status(200).json({
                        hall
                    })
                } else {
                    next(new Error('Hall not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Hall not found, wrong identifier', 422))
            })
    },
    getAllHalls(req, res, next) {
        Halls.find({})
            .then((halls) => {
                res.status(200).json({
                    halls
                })
            })
            .catch(() => {
                next(new Error({ message: 'Halls not found, no movies have been posted yet', code: 404 }))
            })
    },
    updateHall(req, res, next) {
        const hallId = req.params.id
        const newbody = req.body

        Halls.update(newbody)
            .then(hall => res.status(201).json({
                "message": "Hall has been updated.",
                "code": 201,
                "hall": hall
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 422 }))
            })
    },

    deleteHall(req, res, next) {
        const hallId = req.params.id

        Halls.findOneAndDelete({ _id: hallId })
            .then(() => res.status(200).json({
                "message": "Hall has been deleted",
                "code": 200,
                "hallId": hallId
            }))
            .catch(() => {
                next(new Error('Hall not found, wrond identifier.', 422))
            })
    }
}