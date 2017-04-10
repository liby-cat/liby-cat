'use strict';

function error(msg) {
  var error = new Error();
  error.status = 422;
  error.message = msg;
  return error;
}

module.exports = function(Entry) {
};
