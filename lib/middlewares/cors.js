'use strict';

var cors = require('cors');
var defaults = require('101/defaults');

module.exports = corsFactory;

function corsFactory (opts) {
  opts = opts || {};
  defaults(opts, {
    origin: function(origin, cb){
      cb(null, true); // always true
    }
  });
  return cors(opts);
}