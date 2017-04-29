module.exports = function error() {
  var e = new Error();
  e.status = arguments.length > 1 ? arguments[0] : 400;
  e.message = arguments.length === 1 ? arguments[0] :
    arguments.length > 1 ? arguments[1] :
      'Unknown Error';
  return e;
};
