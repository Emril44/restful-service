const VideoGame = require('../models/videogame');
const options = { new: true, runValidators: true };

exports.getAllVideogames = async (req, res) => {
    try {
        const videoGames = await VideoGame.find();
        res.json(videoGames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVideogame = async (req, res) => {
    try {
        // fetch game data from request body
        const { title, platform, genre, release_year, rating, developer } = req.body;

        // use create() to make new game document
        const videoGame = await VideoGame.create({
            title, platform, genre, release_year, rating, developer
        });

        // return game created
        res.status(200).json(videoGame);
    } catch (error) {
        // code 500 if error occurs during creation
        console.error('Error creating: ', error);
        res.status(500).json([{ error: 'Internal server error' }]);
    }
};

exports.getVideogameById = async (req, res) => {
    try {
        // find game by ID
        const videoGame = await VideoGame.findById(req.params.id);
        
        // 404 if game doesn't exist
        if(!videoGame) {
            return res.status(404).json({ error: 'Videogame not found' });
        }

        // return game found vy ID
        res.json(videoGame);
    } catch (error) {
        // code 500 if error occurs during search
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateVideogameById = async (req, res) => {
    try {
        // find game by ID and update it with req.body, then ensure new doc is returned via new: true
        const videoGame = await VideoGame.findByIdAndUpdate(req.params.id, req.body, options);

        // 404 if game doesn't exist
        if(!videoGame) {
            return res.status(404).json({ error: 'Videogame not found' });
        }

        // return updated game
        res.json(videoGame);
    } catch (error) {
        // code 500 if error occurs during update
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteVideogameById = async (req, res) => {
    try {
        // find game by ID and delete ot
        const videoGame = await VideoGame.findByIdAndDelete(req.params.id);
        
        // 404 if game isn't found
        if(!videoGame) {
            return res.status(404).json({ error: 'Videogame not found' });
        }

        // success message if delete went through
        res.status(200).json({ log: 'Videogame successfully deleted' });
    } catch (error) {
        // code 500 if error occurs during deletion
        res.status(500).json({ error: 'Internal server error' });
    }
};