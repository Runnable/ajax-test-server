'use strict';

var httpProxy = require('http-proxy');
var proxyServer = httpProxy.createProxyServer({});

module.exports = proxy;

function proxy (req, res, next) {
  var target = req.query.target;
  if (!target) {
    res.json(400, {
      message: '`req.query.target` is required. Ex: http://example.com:8080'
    });
    return;
  }
  proxyServer.web(req, res, { target: target });
}