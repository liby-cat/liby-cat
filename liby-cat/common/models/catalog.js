'use strict';
var extend = require('extend');
var error = require('../util/error');

module.exports = function (Catalog) {
  Catalog.createOptionsFromRemotingContext = function (ctx) {
    //console.log('Catalog.createOptionsFromRemotingContext')
    var base = this.base.createOptionsFromRemotingContext(ctx);
    return extend(base, {
      currentUserId: base.accessToken && base.accessToken.userId
    });
  };

  //region HIDE UNSUPPORTED API ENDPOINTS
  Catalog.disableRemoteMethodByName('patchOrCreate');//PATH /catalog
  Catalog.disableRemoteMethodByName('replaceOrCreate');//PUT /catalog
  Catalog.disableRemoteMethodByName('deleteById');//DELETE /catalog{id}
  Catalog.disableRemoteMethodByName('replaceById');//PUT /catalog/{id}, POST /catalog/{id}/replace
  Catalog.disableRemoteMethodByName('updateAll');//POST /catalog/update
  Catalog.disableRemoteMethodByName('upsertWithWhere');//POST /catalog/upsertWithWhere
  Catalog.disableRemoteMethodByName('prototype.patchAttributes');//PATCH
  Catalog.disableRemoteMethodByName('findOne');//GET /catalog/findOne

  Catalog.disableRemoteMethodByName('prototype.__create__owners');
  Catalog.disableRemoteMethodByName('prototype.__delete__owners');
  Catalog.disableRemoteMethodByName('prototype.__findById__owners');//GET /catalog/{id}/owners/{fk}
  Catalog.disableRemoteMethodByName('prototype.__updateById__owners');
  Catalog.disableRemoteMethodByName('prototype.__destroyById__owners');

  Catalog.disableRemoteMethodByName('prototype.__create__readers');
  Catalog.disableRemoteMethodByName('prototype.__delete__readers');
  Catalog.disableRemoteMethodByName('prototype.__findById__readers');
  Catalog.disableRemoteMethodByName('prototype.__updateById__readers');
  Catalog.disableRemoteMethodByName('prototype.__destroyById__readers');

  Catalog.disableRemoteMethodByName('prototype.__delete__entries');//DELETE /catalog/{id}/entries

  // hide endpoints that are semantically wrong
  Catalog.disableRemoteMethodByName('prototype.__count__owners');//GET /catalog/{id}/owners/count
  Catalog.disableRemoteMethodByName('prototype.__count__readers');//GET /catalog/{id}/readers/count

  // temporarily hide  buggy
  Catalog.disableRemoteMethodByName('prototype.__exists__owners');//HEAD /catalog/{id}/owners/rel/{fk}
  Catalog.disableRemoteMethodByName('prototype.__exists__readers');//HEAD /catalog/{id}/readers/rel/{fk}


  //endregion
  //#region INSTANCE METHODS

  Catalog.prototype.userCanRead = function userCanRead(uid) {
    console.log(this);
    return this.ownerIds && this.ownerIds[uid] === 1;
  };

  Catalog.computeIsOwned = function computeIsOwned(cat) {
    return cat.isOwn;
  };

  //endregion
  //region OBSERVERS

  Catalog.observe('loaded', function onLoad(ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const loginId = token && token.userId;
    if(loginId && ctx.instance){
      ctx.instance.isOwn = ctx.instance.ownerIds.includes(loginId);
    } else if(loginId && ctx.data){
      ctx.data.isOwn = false;
      for (var i in ctx.data.ownerIds){
        ctx.data.isOwn = ctx.data.isOwn || ''+loginId===''+ctx.data.ownerIds[i];
      }
      ctx.data.loginId = loginId;
    }
    console.log(ctx.data);
    next();
  });

  Catalog.observe('access', function enforceUserReadAccess(ctx, next) {
    console.log('Catalog>observe>access:enforceUserReadAccess');
    const token = ctx.options && ctx.options.accessToken;
    const loginId = token && token.userId;
    ctx.query = ctx.query ? ctx.query : {};
    ctx.query.where = ctx.query.where ? ctx.query.where : {};
    ctx.query.where.readerIds = loginId;
    next();
  });

  //endregion
  //region REMOTE HOOKS
  Catalog.beforeRemote('**', function (ctx, unused, next) {
    console.log('in Catalog method:' + ctx.methodString);
    next();
  });

  function hasWriteAccess(ctx, cat, next, applyFn) {
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const loginId = token && token.userId;
    if (ctx.instance) {
      ctx.instance.owners.exists(loginId, function (err, isOwner) {
        if (err) {
          next(err);
        }
        else if (isOwner) {
          applyFn(ctx, cat, next, loginId);
        } else {
          next(error(403, 'Permission Denied'));
        }
      })
    } else {
      next(error(404, 'instance not found'));
    }
  }

  Catalog.beforeRemote('create', function onCatalogCreation(ctx, unused, next) {
    console.log('Catalog>beforeRemote>create:onCatalogCreation');
    if (ctx.args && ctx.args.data) {
      var cat = ctx.args.data;
      var orgId = cat.orgId;
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const loginId = token && token.userId;
      const Org = Catalog.app.models.Org;
      Org.find({where: {id: orgId, adminIds: loginId}}, function (err, orgs) {
        if (err) {
          next(err);
        }
        if (orgs && orgs.length === 1) {
          var org = orgs[0];
          console.log(org);
          cat.orgIdx = org.orgIdx;
          Catalog.find({where: {orgIdx: cat.orgIdx, catalogIdx: cat.catalogIdx}},
            function (err, cats) {
              if (err) {
                next(err);
              }
              if (cats == null || cats === null || cats.length === 0) {
                cat.ownerIds = [loginId];
                cat.readerIds = [loginId];
                next();
              } else {
                next(error('Catalog with same catalogIdx within this org already exists'));
              }
            });
        } else {
          next(error(404, 'org not found/user not permitted'))
        }
      });
    } else {
      console.log('no data');
      next();
    }
  });

  //endregion
  //region REMOTE HOOKS: OWNERS & READERS
  Catalog.beforeRemote('prototype.__link__owners', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      var uid = ctx.args.fk;
      ctx.instance.readers.exists(uid, function (err, res) {
        if (!res) {
          //also grant read access to owner
          ctx.instance.readers.add(uid);
        }
      });
      next();
    });
  });

  Catalog.beforeRemote('prototype.__unlink__owners', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      next();
    });
  });

  Catalog.beforeRemote('prototype.__link__readers', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      next();
    });
  });

  Catalog.beforeRemote('prototype.__unlink__readers', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      var uid = ctx.args.fk;
      ctx.instance.owners.exists(uid, function (err, res) {
        if (res) {
          next(error('Cannot remove read access from an owner'))
        } else {
          next();
        }
      });
    });
  });

  //endregion
  //region REMOTE HOOKS: ENTRIES

  Catalog.beforeRemote('prototype.__create__entries', function (ctx, inst, next) {
    hasWriteAccess(ctx, inst, next, onEntryUpsert);
  });

  Catalog.beforeRemote('prototype.__updateById__entries', function (ctx, inst, next) {
    hasWriteAccess(ctx, inst, next, onEntryUpsert);
  });

  function onEntryUpsert(ctx, unused, next, loginId) {
    if (ctx.instance) {
      var cat = ctx.instance;
      var entryData = ctx.args.data;
      if (entryData === {} || !entryData.title) {
        next(error('No data provided or title empty.'));
        return;
      }
      console.log('WRITE catalog entry to' + cat.orgIdx + '/' + cat.catalogIdx);
      entryData.orgIdx = cat.orgIdx;
      entryData.catalogIdx = cat.catalogIdx;
      next();
    } else {
      next(error(404, 'instance not found'));
    }
  }

  //endregion

};
