const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Oficina = sequelize.define('Oficina', {
	nombre: {
		type: DataTypes.STRING,
		allowNull: false
	},
	aeropuerto: {
		type: DataTypes.STRING,
		allowNull: false
	},
	admin: {
		type: DataTypes.STRING,
		allowNull: true
	}
})

module.exports = Oficina;