const express = require('express');
const router = express.Router();
const videogameController = require('../controllers/videogameController.js');

// get all videogames
router.get('/', videogameController.getAllVideogames);

// create new videogame
router.post('/', videogameController.createVideogame);

// get specific videogame by ID
router.get('/:id', videogameController.getVideogameById);

// update videogame by ID
router.put('/:id', videogameController.updateVideogameById);

// delete videogame by ID
router.delete('/:id', videogameController.deleteVideogameById);

module.exports = router;