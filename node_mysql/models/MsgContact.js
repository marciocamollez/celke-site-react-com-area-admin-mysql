const Sequelize = require('sequelize');
const db = require('./db');

const MsgContact = db.define('msgs_contacts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

//Criar a tabela no BD
// MsgContact.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//MsgContact.sync({ alter: true });

module.exports = MsgContact;
