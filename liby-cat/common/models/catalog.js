'use strict';

module.exports = function(Catalog) {
  Catalog.entries = function (id, cb) {
    cb(null, {book:'khaa'});
  };

  Catalog.remoteMethod(
    'entries',
    {
      accepts: {arg: 'id', type: 'string', required: true},
      http: {path: '/:id/entries', verb: 'get'},
      returns: {arg: 'data', type: 'Object'}
    });
};
