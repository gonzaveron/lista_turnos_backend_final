const {Operadores} = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function authOper(usuario, pass){
  const operador = await Operadores.findOne({where: {usuario}, raw: true})
    .catch((err) => {console.log('Error: ', err)});
  return new Promise(resolve => {
    bcrypt.compare(pass, operador.pass, (err, result) => {
      if (result){
        resolve({usuario: operador.usuario, oficina: operador.OficinaId});
      } else {
        resolve(0)
      }
    });
  })
}

async function cryptOperPass(pass){
  return new Promise(resolve => {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
      resolve(hash);
    });
  })
}

module.exports = {
  cryptOperPass,
  authOper
}