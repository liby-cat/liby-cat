'use strict';

function error(msg) {
  var e = new Error();
  e.status = 422;
  e.message = msg;
  return e;
}

module.exports = function (Catalog) {
  
  //#region HIDE UNSUPPORTED API ENDPOINTS
  Catalog.disableRemoteMethodByName('patchOrCreate', false);//PATH /catalog
  Catalog.disableRemoteMethodByName('replaceOrCreate', false);//PUT /catalog
  
  Catalog.disableRemoteMethodByName('prototype.__create__owners', false);
  Catalog.disableRemoteMethodByName('prototype.__delete__owners', false);
  Catalog.disableRemoteMethodByName('prototype.__findById__owners', false);//GET /catalog/{id}/owners/{fk}
  Catalog.disableRemoteMethodByName('prototype.__updateById__owners', false);
  Catalog.disableRemoteMethodByName('prototype.__destroyById__owners', false);
  
  Catalog.disableRemoteMethodByName('prototype.__create__readers', false);
  Catalog.disableRemoteMethodByName('prototype.__delete__readers', false);
  Catalog.disableRemoteMethodByName('prototype.__findById__readers', false);
  Catalog.disableRemoteMethodByName('prototype.__updateById__readers', false);
  Catalog.disableRemoteMethodByName('prototype.__destroyById__readers', false);
  
  Catalog.disableRemoteMethodByName('prototype.__delete__entries', false);//DELETE /catalog/{id}/entries
  
  
  //#region INSTANCE METHODS
  
  Catalog.prototype.userCanRead = function userCanRead(userId) {
    console.log(this);
    return this.ownerIds && this.ownerIds[userId] === 1;
  };
  
  //#region OBSERVERS
  
  Catalog.observe('access', function enforceOrgId(ctx, next) {
    next();
  });
  
  //#region REMOTE HOOKS
  
  Catalog.beforeRemote('**', function (ctx, unused, next) {
    console.log('in Catalog method:' + ctx.methodString);
    next();
  });
  
  Catalog.beforeRemote('create', function enforceOrgId(ctx, unused, next) {
    console.log('Catalog>beforeRemote>create:enforceOrgId');
    console.log(unused);
    if (ctx.args && ctx.args.data) {
      var cat = ctx.args.data;
      var orgId = cat.orgId;
      Catalog.app.models.Org.find({where: {id: orgId}}, function (err, orgs) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          if (Array.isArray(orgs) && orgs.length === 1) {
            var org = orgs[0];
            cat.orgIdx = org.orgIdx;
            Catalog.find({where: {orgIdx: cat.orgIdx, catalogIdx: cat.catalogIdx}},
              function (err, cats) {
                if (err) {
                  next(err);
                }
                if (cats == null || cats === null || cats.length === 0) {
                  next();
                } else {
                  next(error('Catalog with same catalogIdx withing this org already exists'));
                }
              });
          } else {
            next(error('org not found with id:' + orgId));
          }
        }
      });
    } else {
      console.log('no data');
      next();
    }
  });
  
  Catalog.afterRemote('create', function relateUserAsOwnerReader(ctx, cat, next) {
    console.log('Catalog>afterRemote>create:relateUserAsOwnerReader');
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const userId = token && token.userId;
    cat.owners.add(userId);
    cat.readers.add(userId);
    next();
  });
  
  Catalog.beforeRemote('find', enforceUserAccessFilter);
  Catalog.beforeRemote('count', enforceUserAccessWhere);
  
  function enforceUserAccessFilter(ctx, unused, next) {
    console.log('catalog.enforceUserAccessFilter');
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const userId = token && token.userId;
    ctx.args.filter = ctx.args.filter ? ctx.args.filter : {};
    ctx.args.filter.where = ctx.args.filter.where ? ctx.args.filter.where : {};
    ctx.args.filter.where.readerIds = userId;
    console.log(ctx.args.filter);
    next();
  }
  
  function enforceUserAccessWhere(ctx, unused, next) {
    console.log('catalog.enforceUserAccess');
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const userId = token && token.userId;
    ctx.args.where = ctx.args.where ? ctx.args.where : {};
    ctx.args.where.readerIds = userId;
    console.log(ctx.args);
    next();
  }
  
  //#region OWNERS
  Catalog.beforeRemote('prototype.__link__owners', function (ctx, cat, next) {
    if (ctx.instance && ctx.args && ctx.args.fk) {
      var userId = ctx.args.fk;
      Catalog.app.models.user.exists(userId, function (err, exists) {
        if (err) {
          next(err);
        } else if (exists) {
          ctx.instance.readers.add(userId);
          next();
        } else {
          next(error('cannot find user'));
        }
      });
    } else {
      next(error('invalid arguments'));
    }
  });
  
  //#region ENTRIES
  Catalog.beforeRemote('prototype.__get__entries', function enforceUserIsReader(ctx, unused, next) {
    console.log('Catalog>beforeRemote>__get__entries:enforceUserIsReader');
    if (ctx.instance) {
      var cat = ctx.instance;
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const userId = token && token.userId;
      cat.readers.exists(userId, function (err, res) {
        if (err) {
          next(err)
        }
        else if (res) {
          console.log('READ catalog entries:' + cat.orgIdx + '/' + cat.catalogIdx);
          next();
        } else {
          next(error("User is not permitted to read entries from this catalog"));
        }
      });
    } else {
      next(error('invalid catalog instance'));
    }
  });

  Catalog.beforeRemote('prototype.__create__entries', function validateNewEntry(ctx, inst, next) {
    console.log('Catalog>beforeRemote>__create__entries:validateNewEntry');
    validateEntryUpsert(ctx, inst, next);
  });
  
  Catalog.beforeRemote('prototype.__updateById__entries', function validateEntryUpdate(ctx, inst, next) {
    console.log('Catalog>beforeRemote>__updateById__entries:validateEntryUpdate');
    validateEntryUpsert(ctx, inst, next);
  });
  
  function validateEntryUpsert(ctx, unused, next) {
    console.log('Catalog>beforeRemote>__updateById__entries:validateEntryUpdate');
    if (ctx.instance) {
      var cat = ctx.instance;
      var entryData = ctx.args.data;
      if(entryData==={} || !entryData.title){
        next(error('No data provided or title empty.'));
        return;
      }
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const userId = token && token.userId;
      cat.owners.exists(userId, function (err, res) {
        if (err) {
          next(err)
        }
        else if (res) {
          console.log('ADD catalog entry:' + cat.orgIdx + '/' + cat.catalogIdx);
          entryData.orgIdx = cat.orgIdx;
          entryData.catalogIdx = cat.catalogIdx;
          next();
        } else {
          console.log('DENY User:'+userId+' not an owner of catalog:'+ catId+'.');
          next(error('User is not permitted to add new entry in this catalog.'));
        }
      });
    } else {
      next(error('invalid catalog instance'));
    }
  }
  
};
