const jwt = require('jsonwebtoken');

const operServices = require('../services/Operadores');
const {app} = require('./middleware');
require('./backfront');

app.get('/', (req, res) => {
  res.send('Página inicio (servidor)');
})

//body: {usuario, pass}
app.post('/autenticar',
  async (req, res) => {
  const oper = await operServices.authOper(req.body.usuario, req.body.pass).catch();
  if(oper !== 0){
    const payload = {
      usuario: oper.usuario,
      oficina: oper.oficina,
    };
    const token = jwt.sign(payload, app.get('llave'), {
      expiresIn: 1800,
    });
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
})