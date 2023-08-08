const Sequelize = require('sequelize');
const db = require('./db');

const Seo = db.define('seos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  page: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Criar a tabela no BD
// Seo.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//Seo.sync({ alter: true });

//Apagar a tabela antiga e criar novamente
//Seo.sync({ force: true })

module.exports = Seo;
