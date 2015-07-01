'use strict';

var flow = require('middleware-flow');
var mw = require('dat-middleware');
var app = module.exports = require('express')();
app.use(
  mw.log('\nURL', 'url')
);
app.use('/proxy', flow.series(
  mw.log(' - proxy'),
  require('./middlewares/proxy.js')
));
app.use('/cors', flow.series(
  mw.log(' - cors'),
  require('./middlewares/cors.js')()
));
app.use('/cors-fail', flow.series(
  mw.log(' - cors', { origin: 'http://runnable.com' }),
  require('./middlewares/cors.js')({ origin: 'http://runnable.com' })
));
app.use('/sess', flow.series(
  mw.log(' - session'),
  require('./middlewares/session.js')
));
app.use('/sess-cors', flow.series(
  mw.log(' - session'),
  require('./middlewares/session.js'),
  mw.log(' - cors', { credentials: true }),
  require('./middlewares/cors.js')({ credentials: true })
));
app.use('/timeout', flow.series(
  mw.log(' - timeout'),
  require('./middlewares/timeout.js')
));
app.use('/error', flow.series(
  mw.log(' - error'),
  require('./middlewares/error.js')
));
app.use(flow.series(
  mw.log(' - response'),
  require('./middlewares/response.js')
));