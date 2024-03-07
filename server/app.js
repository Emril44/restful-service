const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const videogameRoutes = require('./src/routes/videogameRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const db = require('./src/models/db.js');

app.use(bodyParser.json());
app.use('/videogames', videogameRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});