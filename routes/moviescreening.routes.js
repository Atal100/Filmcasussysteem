const movie_controller = require('../controller/movie.controller.js');
const express = require('express');
const router = express.Router();

router.get('/movies/:id/', movie_controller.getMovie)
router.get('/movies/', movie_controller.getAllMovies)
router.post('/movies/', movie_controller.createMovie)
router.delete('/movies/:id', movie_controller.deleteMovie)
router.update('/movies/:id', movie_controller.updateMovie)

module.exports = router;