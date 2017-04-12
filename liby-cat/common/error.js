/**
 * Created by nafSadh on 12-Apr-17.
 */


module.exports = function error(msg) {
  var e = new Error();
  e.status = 422;
  e.message = msg;
  return e;
};
