const ORM = require('sequelize');
const sequelize = new ORM('tracker', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
