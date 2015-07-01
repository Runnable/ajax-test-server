'use strict';

var app = module.exports = require('express')();

app.use(require('./static-app.js'));
app.use('/api', require('./api-app.js'));
app.use(require('./middlewares/error-handler.js'));