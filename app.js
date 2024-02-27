const express = require('express');
const app = express();
const videogameRoutes = require('./src/routes/videogameRoutes.js');
const db = require('./src/models/db.js');

app.use('/videogames', videogameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});