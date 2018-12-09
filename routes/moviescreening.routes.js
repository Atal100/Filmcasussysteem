const movie_controller = require('../controllers/moviescreening.controller.js');
const express = require('express');
const router = express.Router();

router.get('/moviescreenings/:id/', movie_controller.getmovieScreening)
router.get('/moviescreenings/', movie_controller.getallMoviesScreenings)
router.post('/moviescreenings/', movie_controller.createmovieScreening)
router.delete('/moviescreenings/:id', movie_controller.deletemovieScreening)
router.put('/moviescreenings/:id', movie_controller.updatemovieScreening)

module.exports = router;