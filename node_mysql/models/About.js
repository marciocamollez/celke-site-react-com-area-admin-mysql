const Sequelize = require('sequelize');
const db = require('./db');

const About = db.define('abouts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title_about: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_about: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image_about: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Criar a tabela no BD
// About.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//About.sync({ alter: true });

module.exports = About;
