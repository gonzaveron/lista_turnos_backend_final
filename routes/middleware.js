// noinspection JSCheckFunctionSignatures

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {llave} = require('../config/config');
const jwt = require("jsonwebtoken");

const urlOrigin = 'http://localhost:3000'

app = express();
app.set('llave', llave);

const corsOptions = {
  origin: urlOrigin
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3001, () => {console.log('Servidor iniciado en puerto 3001')});

const protectRoutes = express.Router();
protectRoutes.use((req,
                   res,
                   next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, app.get('llave'), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: 'Token no encontrada.'
    });
  }
});

module.exports = {
  app,
  protectRoutes
}