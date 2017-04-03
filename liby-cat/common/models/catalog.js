'use strict';

module.exports = function(Catalog) {
  Catalog.validatesUniquenessOf('catalogId');

  Catalog.observe('before save', function enforceOrgId(ctx, next) {
    if (ctx.instance) {
      var orgId = ctx.instance.orgId;
      var org = ctx.instance.__get__org();
      console.log(org);
      console.log(orgId);
      console.log(Catalog.app.models.Org.find);
      Catalog.app.models.Org.find({where: {orgId: orgId}}, function(e, i) {
        org = i;
      });
      console.log(org);
    }
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
