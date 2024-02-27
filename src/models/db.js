const mongoose = require('mongoose');

// connection URI
const mongoURI = 'mongodb://localhost:27017/restfuldb';

// connect to Mongo
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

mongoose.connection('error', err => {
    console.error('MongoDB connection error: ', err);
});

mongoose.connection('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});