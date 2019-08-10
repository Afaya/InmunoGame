const jwt = require('jsonwebtoken');

const userName = 'miuser';
const password = 'mipass';
const privateKey = 'misecret';

module.exports = function (app) {
    app.post('/login', (req, res) => {
        var user = req.body.user;
        var pass = req.body.password;
       
        if( !(user === userName && pass === password)){
          res.status(401).send({
            error: 'usuario o contraseña inválidos'
          })
          return
        }
       
        var tokenData = {
          username: user
        }
        var expiration = 60 * 60 * 24; // expires in 24 hours
       
        var token = jwt.sign(tokenData, privateKey, {
           expiresIn: expiration
        })
       
        res.send({
          expiration,
          token,
          user
        })
      }) 
};