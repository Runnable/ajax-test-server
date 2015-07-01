'use strict';

module.exports = errorHandler;

function errorHandler (err, req, res, next) {
  res.json(500, {
    message: err.message,
    stack: err.stack
  });
}