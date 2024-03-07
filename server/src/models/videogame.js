const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    platform: [{
        type: String,
        required: false
    }],
    genre: {
        type: String,
        required: false
    },
    release_year: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    developer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('VideoGame', videoGameSchema);