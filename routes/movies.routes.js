const movie_controller = require('../controllers/movie.controller.js');
const express = require('express');
const router = express.Router();

router.get('/movies/:id/', movie_controller.getMovie)
router.get('/movies/', movie_controller.getAllMovies)
router.post('/movies/', movie_controller.createMovie)
router.delete('/movies/:id', movie_controller.deleteMovie)
router.put('/movies/:id', movie_controller.updateMovie)

module.exports = router;