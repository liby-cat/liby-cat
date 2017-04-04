'use strict';

module.exports = function(Catalog) {
  Catalog.observe('before save', function enforceOrgId(ctx, next) {
    console.log('catalog.enforceOrgId before save');
    if (ctx.instance) {
      var orgId = ctx.instance.orgId;
      Catalog.app.models.Org.find({where: {id: orgId}}, function(err, orgs) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (Array.isArray(orgs) && orgs.length === 1) {
            var org = orgs[0];
            ctx.instance.orgIdx = org.orgIdx;
            next();
          } else {
            throw 'invalid org';
          }
        }
      });
    } else {
      throw 'instance not found';
    }
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
