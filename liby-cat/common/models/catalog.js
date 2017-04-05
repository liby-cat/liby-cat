'use strict';

function validationError(msg) {
  var error = new Error();
  error.status = 422;
  error.message = msg;
  return error;
}

module.exports = function(Catalog) {
  Catalog.observe('before save', function enforceOrgId(ctx, next) {
    console.log('catalog.enforceOrgId before save');
    if (ctx.instance) {
      var orgId = ctx.instance.orgId;
      Catalog.app.models.Org.find({where: {id: orgId}}, function(err, orgs) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          if (Array.isArray(orgs) && orgs.length === 1) {
            var org = orgs[0];
            ctx.instance.orgIdx = org.orgIdx;
            next();
          } else {
            next(validationError('org not found with id:' + orgId));
          }
        }
      });
    } else {
      next(validationError('instance not found'));
    }
  });

  Catalog.beforeRemote('prototype.__get__entries', function(ctx, unused, next) {
    if (ctx.instance) {
      var cat = ctx.instance;
      var catSlug = (cat.orgIdx ? cat.orgIdx : '') +
        '/' + (cat.catalogIdx ? cat.catalogIdx : '');
      console.log('getting entries from ' + catSlug + ' #' + cat.id);
      next();
    } else {
      next(validationError('invalid catalog Id'));
    }
  });
  Catalog.beforeRemote('**', function(ctx, unused, next) {
    console.log('method:' + ctx.methodString);
    next();
  });

  Catalog.test = function(id, cb) {
    cb(null, {book: 'khaa'});
  };

  Catalog.remoteMethod(
    'test',
    {
      accepts: {arg: 'id', type: 'string', required: true},
      http: {path: '/:id/test', verb: 'get'},
      returns: {arg: 'data', type: 'Object'},
    });
};
