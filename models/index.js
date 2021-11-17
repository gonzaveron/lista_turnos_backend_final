const Oficinas = require('./Oficinas');
const Operadores = require('./Operadores');
const Turnos = require('./Turnos');

Operadores.belongsTo(Oficinas);
Turnos.belongsTo(Operadores);

module.exports = {
  Oficinas,
  Operadores,
  Turnos
}