'use strict';

module.exports = require('express-session')({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
});