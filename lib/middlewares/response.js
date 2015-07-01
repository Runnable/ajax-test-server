'use strict';

module.exports = response;

function response (req, res, next) {
  res.json({
    message: req.method + ' /api' + req.url
  });
}