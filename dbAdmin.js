const sequelize = require('./connection');
const {seedOficinas, seedOperadores} = require('./seeders');
require('./models');

(function dbAdmin(){
  switch (process.argv[2]){
    case 'test':
      sequelize.authenticate()
        .then(() => {console.log('Connection has been established successfully.')})
        .catch((error) => {console.log('No se pudo conectar a la base de datos:', error)});
      break;
    case 'sync':
      sequelize.sync({force: true})
        .then(() => {console.log('Modelos sincronizados')})
        .catch((error) => {console.log('Se produjo un error: ', error)});
      break;
    case 'seed':
      seedOficinas();
      seedOperadores();
      break;
    default:
      console.log('Falta especificar acción:');
      console.log('> test');
      console.log('> sync');
      console.log('> seed');
  }
})();