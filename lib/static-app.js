'use strict';

var app = module.exports = require('express')();

var publicDir = require('path').resolve(__dirname, '..', 'public');
app.use(require('serve-static')(publicDir));