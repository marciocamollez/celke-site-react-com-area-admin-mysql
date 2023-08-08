const Sequelize = require('sequelize');
const db = require('./db');

const Home = db.define('homes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title_top_one: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_top_two: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_top_three: {
    type: Sequelize.STRING,
    allowNull: false
  },
  btn_text_top: {
    type: Sequelize.STRING,
    allowNull: false
  },
  btn_link_top: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_top: {
    type: Sequelize.STRING
  },
  ser_title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_icon_one: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_title_one: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_desc_one: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_icon_two: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_title_two: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_desc_two: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_icon_three: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_title_three: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ser_desc_three: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title_ser_prem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subtitle_ser_prem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc_ser_prem: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  btn_text_ser_prem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  btn_link_ser_prem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_ser_prem: {
    type: Sequelize.STRING
  }
});

//Criar a tabela no BD
// Home.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//Home.sync({ alter: true });

module.exports = Home;
