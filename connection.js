const {Sequelize} = require('sequelize');

const {dbConfig} = require('./config/config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	define: {
		freezeTableName: true
	}
});

module.exports = sequelize;