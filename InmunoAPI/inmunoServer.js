const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // POST, OPTIONS, PUT, DELETE
    res.header('Allow', 'GET, POST, OPTIONS'); // POST, PUT, DELETE
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('/home/pi/Desktop/InmunoAPI/api/routes/login')(app);
require('/home/pi/Desktop/InmunoAPI/api/routes/sensors_routes')(app);
require('/home/pi/Desktop/InmunoAPI/api/routes/data_routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});