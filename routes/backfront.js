const {app, protectRoutes} = require('./middleware');
const {Operadores, Oficinas, Turnos} = require('../models');
const {cryptOperPass} = require('../services/Operadores');

//body: {usuario, newPass}
app.post('/passReset', protectRoutes,
  async (req,
         res) => {
    const usuario = req.body.usuario;
    const newPass = req.body.newPass;
    const operador = await Operadores.findOne({where: {usuario}}).catch();
    const oficina = await Oficinas.findOne({where: {id: operador.OficinaId}}).catch();
    const oficinaAdmin = oficina.admin;
    if (req.decoded.usuario === oficinaAdmin) {
      Operadores.update({pass: await cryptOperPass(newPass)}, {where: {usuario}}).catch();
      res.send('Contraseña cambiada');
    } else {
      res.send('Administrador inválido');
    }
  });

//body: {oficinaId}
app.get('/getOpers', protectRoutes,
  async (req, res) => {
    const oficinaId = req.body.oficinaId;
    const opers = await Operadores.findAll({
      attributes: ['nombre'],
      where: {OficinaId: oficinaId}
    }).catch(err => {console.log('Error: ', err)});
    res.send(opers);
  });

//body: {admin}
app.get('/getOfis', protectRoutes,
  async (req, res) => {
    const admin = req.body.admin;
    const oficinas = await Oficinas.findAll({
      attributes: ['nombre'],
      where: {admin}
    }).catch();
    res.send(oficinas);
  });

//body: {usuario, mes, anio}
app.get('/getTurnos', protectRoutes,
  async (req, res) => {
    const OperadorUsuario = req.body.usuario;
    const mes = req.body.mes;
    const anio = req.body.anio;
    const turnos = Turnos.findAll({
      attributes: ['dia', 'horario'],
      where: {mes, anio, OperadorUsuario}
    });
    res.send(turnos);
  })

//body: {mes, anio, turnos: {dia, horario, OperadorUsuario}}
app.post('/sendTurnos', protectRoutes,
  async (req,
         res) => {
    const mes = req.body.mes;
    const anio = req.body.anio;
    const turnos = req.body.turnos;
    const array = [];
    turnos.forEach(elemento => {
      array.push({...elemento, mes, anio})
    });
    Turnos.bulkCreate(array).catch();
  })