const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Turnos = sequelize.define('Turno', {
	anio: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	mes: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	dia: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	horario: {
		type: DataTypes.STRING,
		allowNull: false
	},
	//OperadorUsuario: string
})

module.exports = Turnos;