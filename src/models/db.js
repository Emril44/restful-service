const mongoose = require('mongoose');

// connection URI
const mongoURI = 'mongodb://localhost:27017/restfuldb';

// connect to Mongo
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});