'use strict';

var port = process.env.PORT || 3000;

var app = require('./lib/app.js');

app.listen(3000, function (err) {
  if (err) { throw err; }
  console.log('listening on ', port);
});