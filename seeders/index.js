const {Oficinas, Operadores} = require('../models');
const {cryptOperPass} = require('../services/Operadores');

const operadoresAISCOMBAR = [
  {usuario: 'jcapalbo', nombre: 'CAPALBO', pass: 'jcapalbo', OficinaId: 1},
  {usuario: 'pcataldo', nombre: 'CATALDO', pass: 'pcataldo', OficinaId: 1},
  {usuario: 'adiribarne', nombre: 'DIRIBARNE A', pass: 'adiribarne', OficinaId: 1},
  {usuario: 'mdiribarne', nombre: 'DIRIBARNE M', pass: 'mdiribarne', OficinaId: 1},
  {usuario: 'pgmorillo', nombre: 'G MORILLO', pass: 'pgmorillo', OficinaId: 1},
  {usuario: 'igonzalez', nombre: 'GONZALEZ', pass: 'igonzalez', OficinaId: 1},
  {usuario: 'mmarrero', nombre: 'MARRERO', pass: 'mmarrero', OficinaId: 1},
  {usuario: 'amendez', nombre: 'MENDEZ', pass: 'amendez', OficinaId: 1},
  {usuario: 'enievas', nombre: 'NIEVAS', pass: 'enievas', OficinaId: 1},
  {usuario: 'gveron', nombre: 'VERON', pass: 'gveron', OficinaId: 1},
  {usuario: 'jzamponi', nombre: 'ZAMPONI', pass: 'jzamponi', OficinaId: 1},
];

const oficinas = [
  {nombre: 'AIS/COM', aeropuerto: 'Bariloche', admin: 'gveron'},
  {nombre: 'TWR', aeropuerto: 'Bariloche', admin: 'gveron'},
];

function seedOficinas(){
  Oficinas.bulkCreate(oficinas).then();
}

function seedOperadores() {
  operadoresAISCOMBAR.forEach(async elemento => {
    Operadores.create({...elemento, pass: await cryptOperPass(elemento.pass)})
      .catch((err) => {console.log('Error: ', err)});
  })
}

module.exports = {
  seedOficinas,
  seedOperadores
}