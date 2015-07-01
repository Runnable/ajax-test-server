'use strict';

module.exports = error;

function error (req, res, next) {
  next(new Error('boom'));
}