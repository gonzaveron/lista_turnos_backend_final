const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Operador = sequelize.define('Operador', {
	usuario: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false
	},
	pass: {
		type: DataTypes.STRING,
		allowNull: false
	},
})

module.exports = Operador;