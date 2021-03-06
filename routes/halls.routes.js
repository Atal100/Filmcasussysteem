const halls_controller = require('../controllers/halls.controller.js');
const express = require('express');
const router = express.Router();

router.get('/halls/:id/',halls_controller.getHall)
router.get('/halls/', halls_controller.getAllHalls)
router.post('/halls/', halls_controller.createHall)
router.delete('/halls/:id', halls_controller.deleteHall)
router.put('/halls/:id', halls_controller.updateHall)

module.exports = router;