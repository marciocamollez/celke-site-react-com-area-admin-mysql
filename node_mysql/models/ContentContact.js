const Sequelize = require('sequelize');
const db = require('./db');

const ContentContact = db.define('contents_contacts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title_contact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_contact: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  icon_company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  icon_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  icon_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_form: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Criar a tabela no BD
// ContentContact.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//ContentContact.sync({ alter: true });

module.exports = ContentContact;
