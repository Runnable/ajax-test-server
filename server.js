'use strict';

var port = process.env.PORT || 3000;

var app = require('./lib/app.js');

app.listen(port, function (err) {
  if (err) { throw err; }
  console.log('listening on ', port);
});