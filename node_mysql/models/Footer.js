const Sequelize = require('sequelize');
const db = require('./db');

const Footer = db.define('footers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  footer_desc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  footer_text_link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  footer_link: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Criar a tabela no BD
// Footer.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//Footer.sync({ alter: true });

//Apaga a tabela antiga e cria novamente
//Footer.sync({ force: true })

module.exports = Footer;
