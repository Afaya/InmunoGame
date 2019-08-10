const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const SDS011Client = require("sds011-client");
const tempHumSensor = require('node-dht-sensor');

const sensor = new SDS011Client("/dev/ttyUSB0");
const privateKey = 'mysecret';

var connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'myuser',
    password: 'mypass',
    database: 'InmunoGameDB'
});

// Particles sensor
var responseSDS011 = "";

// Humidity and Temperature sensor
const sensorDHTType = 11;
const sensorDHTGpio = 16;
var responseDHT = "";

var isStartedToSaveData = 0;

function verifyToken(req) {
    var token = req.headers['authorization'];

    if (!token) {
        return false;
    }

    token = token.replace('Bearer ', '');

    try {
        return jwt.verify(token, privateKey);
    } catch (err) {
        return false;
    }
}

function formatDateToString(dateIn) {
    var outDateString = '';

    var year = dateIn.getFullYear();
    var month = dateIn.getMonth() + 1;
    var day = dateIn.getDate();

    if (day < 10) {
        day = '0' + day;
    }

    var hours = dateIn.getHours();

    if (hours < 10) {
        hours = '0' + hours;
    }

    var minutes = dateIn.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var seconds = dateIn.getSeconds();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    outDateString = '' + year + '-' + month + '-' + day + ' ' + hours + ":" + minutes + ":" + seconds;

    return outDateString;
}

function saveDataToDB() {
    var getData_date = new Date();
    var getData_dateString = formatDateToString(getData_date);
    var temperature = parseFloat(responseDHT.temp);
    var humidity = parseFloat(responseDHT.hum);
    var particle25 = parseFloat(responseSDS011.pm25);
    var particle100 = parseFloat(responseSDS011.pm100);

    connection.getConnection(function (error, tempCont) {
        if (error) {
            tempCont.release();
        } else {
             tempCont.query("INSERT INTO sensorsData (getData_date, temperature, humidity, particle25, particle100) VALUES ('" + getData_dateString + "'," + temperature + "," + humidity + "," + particle25 + "," + particle100 + ")",
                 function (error, rows, fields) {
                     tempCont.release();
                     if (error) {
                    } else {
                     }
                 });
        }
    });
}

module.exports = function (app) {
    app.get('/dht', function (req, res) {
        if (verifyToken(req) == false) {
            res.status(401).send({
                error: 'Token inválido o inexistente'
            });
            return;
        }

        res.json(responseDHT);
    })

    app.get('/sds011', function (req, res) {
        if (verifyToken(req) == false) {
            res.status(401).send({
                error: 'Token inválido o inexistente'
            });
            return;
        }

        res.json(responseSDS011);
    })
};

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
            tempHumSensor.read(sensorDHTType, sensorDHTGpio, function (error, temp, hum) {
                if (!error) {
                    console.log('temp: ' + temp.toFixed(1) + 'ºC');
                    console.log('hum: ' + hum.toFixed(1) + '%');

                    responseDHT = { temp: temp.toFixed(1), hum: hum.toFixed(1) };
                } else {
                    app.sendStatus(500);
                }
            });
            console.log("Querying...");
            sensor
                .query()
                .then((data) => {
                    console.log(`Received: ` + JSON.stringify(data));
                    responseSDS011 = data;
                    responseSDS011 = { pm25: data.pm2p5, pm100: data.pm10 };

                    if (isStartedToSaveData < 1) {
                        isStartedToSaveData = 1;
                        saveDataToDB();
                    }
                }).catch((error) => {
                    app.sendStatus(500);
                });
        }, 5000);

        setInterval(() => {
            saveDataToDB();
        }, 14400000); // dos horas en ms 7200000
    });