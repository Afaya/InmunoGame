var express = require('express'); //llamamos a Express
var cors = require('cors');
var app = express();

var port = process.env.PORT || 8080  // establecemos nuestro puerto

app.use(cors());

const SDS011Client = require("sds011-client");
const sensor = new SDS011Client("/dev/ttyUSB0");
const tempHumSensor = require('node-dht-sensor');

// Particles sensor
var responseSDS011 = "";

// Humidity and Temperature sensor
const sensorDHTType = 11;
const sensorDHTGpio = 16;

app.get('/dht', function (req, res) {
    tempHumSensor.read(sensorDHTType, sensorDHTGpio, function (error, temp, hum) {
        if (!error) {
            console.log('temp: ' + temp.toFixed(1) + 'ºC');
            console.log('hum: ' + hum.toFixed(1) + '%');
            res.json({ temp: temp.toFixed(1) + 'ºC', hum:  hum.toFixed(1) + '%'});
        }
    });
})

app.get('/sds011', function (req, res) {
    res.json(responseSDS011);
})


// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

sensor
    .setReportingMode('query')
    .then(() => {
        console.log("Sensor is now working in query mode.");
        return sensor.setWorkingPeriod(0);
    })
    .then(() => {
        console.log("Working period set to 0 minutes.\n");
        // Request data each second.
        setInterval(() => {
            console.log("Querying...");
            sensor
                .query()
                .then((data) => {
                    console.log(`Received: ` + JSON.stringify(data));
                    responseSDS011 = JSON.stringify(data);
                });
        }, 1000);
    });