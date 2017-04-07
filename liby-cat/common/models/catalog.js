'use strict';

function validationError(msg) {
  var error = new Error();
  error.status = 422;
  error.message = msg;
  return error;
}

module.exports = function(Catalog) {
  Catalog.observe('access', function enforceOrgId(ctx, next) {
    next();
  });
  Catalog.observe('before save', function enforceOrgId(ctx, next) {
    console.log('catalog.enforceOrgId before save');
    if (ctx.instance || ctx.data) {
      var cat = ctx.instance ? ctx.instance : ctx.data;
      var orgId = cat.orgId;
      Catalog.app.models.Org.find({where: {id: orgId}}, function(err, orgs) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          if (Array.isArray(orgs) && orgs.length === 1) {
            var org = orgs[0];
            cat.orgIdx = org.orgIdx;
            Catalog.find({where:{orgIdx:cat.orgIdx, catalogIdx:cat.catalogIdx}},
              function (e, cats) {
                if(e){next(e);}
                if(cats==null || cats===null || cats.length===0) {
                  next();
                } else {
                  next(validationError('Catalog with same catalogIdx withing this org already exists'));
                }
              });
          } else {
            next(validationError('org not found with id:' + orgId));
          }
        }
      });
    } else {
      console.log('no instance');
      next();
    }
  });
  
  Catalog.beforeRemote('find', enforceUserAccessFilter);
  Catalog.beforeRemote('count', enforceUserAccessWhere);
  
  function enforceUserAccessFilter(ctx, unused, next) {
    console.log('catalog.enforceUserAccessFilter');
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const userId = token && token.userId;
    ctx.args.filter = ctx.args.filter ? ctx.args.filter : {};
    ctx.args.filter.where = ctx.args.filter.where ? ctx.args.filter.where : {};
    ctx.args.filter.where['ownerIds.'+userId] = 1;
    console.log(ctx.args);
    next();
  }
  function enforceUserAccessWhere(ctx, unused, next) {
    console.log('catalog.enforceUserAccess');
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const userId = token && token.userId;
    ctx.args.where= ctx.args.where? ctx.args.where: {};
    ctx.args.where['ownerIds.'+userId] = 1;
    console.log(ctx.args);
    next();
  }

  Catalog.beforeRemote('prototype.__link__owners', function(ctx, cat, next) {
    if (ctx.instance && ctx.args && ctx.args.fk) {
      var userId = ctx.args.fk;
      Catalog.app.models.user.exists(userId, function(err, exists) {
        if (err) {
          next(err);
        } else if (exists) {
          ctx.instance.ownerIds =
            ctx.instance.ownerIds ? ctx.instance.ownerIds : {};
          ctx.instance.ownerIds[userId] = 1;
          next();
          Catalog.upsert(ctx.instance, function(e, i) {});
        } else {
          next(validationError('cannot find user'));
        }
      });
    } else {
      next(validationError('invalid arguments'));
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

  Catalog.list = function(options) {
    console.log(options);
    return {text:"message"};
  };

};
