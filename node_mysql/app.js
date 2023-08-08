const express = require('express');
var cors = require('cors');

const path = require('path');
require('dotenv').config();

const user = require('./controller/user');
const login = require('./controller/login');
const profile = require('./controller/profile');

const site_home = require('./controller/site_home');
const site_about = require('./controller/site_about');
const site_cont_contact = require('./controller/site_cont_contact');
const site_msg_contact = require('./controller/site_msg_contact');
const site_footer = require('./controller/site_footer');
const site_seo = require('./controller/site_seo');

const app = express();

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, 'public', 'upload')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization'
  );
  app.use(cors());
  next();
});

app.use('/user', user);
app.use('/login', login);
app.use('/profile', profile);

app.use('/site-home', site_home);
app.use('/site-about', site_about);
app.use('/site-cont-contact', site_cont_contact);
app.use('/site-msg-contact', site_msg_contact);
app.use('/site-footer', site_footer);
app.use('/site-seo', site_seo);

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});
