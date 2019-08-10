//Requires
const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');


//Static Routes
app.use(express.static(path.join(__dirname, 'dist/server-app')));



//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'dist/server-app','index.html')));
const port = 1337;


//Run Server
app.listen(process.env.PORT || port, () => console.log(chalk.white(`Listening intently on port ${port}`)));