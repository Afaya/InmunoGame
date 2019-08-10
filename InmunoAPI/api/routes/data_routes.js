const jwt = require('jsonwebtoken');
const privateKey = 'myprivate';
const mysql = require('mysql');


var connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'tuusuario',
    password: 'tupassword',
    database: 'InmunoGameDB'
});


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

module.exports = function (app) {
    app.get('/last_data', function (req, res) {
        if (verifyToken(req) == false) {
            res.status(401).send({
                error: 'Token inválido o inexistente'
            });
            return;
        }


        connection.getConnection(function (error, tempCont) {
            if (error) {
                tempCont.release();
                res.status(400).send({
                    error: 'Error abriendo conexion de datos'
                });
                return;
            } else {
                tempCont.query("SELECT * FROM sensorsData order by getData_date desc LIMIT 100", function (error, rows, fields) {
                    tempCont.release();
                    if (error) {
                        res.status(400).send({
                            error: 'Error obteniendo datos'
                        });
                        return;
                    } else {
                        res.json(rows);
                    }
                });
            }
        });
    })
};

