const extend = require('extend');
const error = require('../util/error');
const arrToMap = require('arr-to-map');

module.exports = function (Catalog) {
  Catalog.createOptionsFromRemotingContext = function (ctx) {
    let base = this.base.createOptionsFromRemotingContext(ctx);
    return extend(base, {
      currentUserId: base.accessToken && base.accessToken.userId
    });
  };
  
  // region HIDE UNSUPPORTED API ENDPOINTS
  let hideUnsupportedAPIEndpoint = (function () {
    Catalog.disableRemoteMethodByName('patchOrCreate');// PATH /catalog
    Catalog.disableRemoteMethodByName('replaceOrCreate');// PUT /catalog
    Catalog.disableRemoteMethodByName('deleteById');// DELETE /catalog{id}
    Catalog.disableRemoteMethodByName('replaceById');// PUT /catalog/{id}, POST /catalog/{id}/replace
    Catalog.disableRemoteMethodByName('updateAll');// POST /catalog/update
    Catalog.disableRemoteMethodByName('upsertWithWhere');// POST /catalog/upsertWithWhere
    Catalog.disableRemoteMethodByName('prototype.patchAttributes');// PATCH
    Catalog.disableRemoteMethodByName('findOne');// GET /catalog/findOne
    
    Catalog.disableRemoteMethodByName('prototype.__create__owners');
    Catalog.disableRemoteMethodByName('prototype.__delete__owners');
    Catalog.disableRemoteMethodByName('prototype.__findById__owners');// GET /catalog/{id}/owners/{fk}
    Catalog.disableRemoteMethodByName('prototype.__updateById__owners');
    Catalog.disableRemoteMethodByName('prototype.__destroyById__owners');
    
    Catalog.disableRemoteMethodByName('prototype.__create__readers');
    Catalog.disableRemoteMethodByName('prototype.__delete__readers');
    Catalog.disableRemoteMethodByName('prototype.__findById__readers');
    Catalog.disableRemoteMethodByName('prototype.__updateById__readers');
    Catalog.disableRemoteMethodByName('prototype.__destroyById__readers');
    
    Catalog.disableRemoteMethodByName('prototype.__delete__entries');// DELETE /catalog/{id}/entries
    
    // hide endpoints that are semantically wrong
    Catalog.disableRemoteMethodByName('prototype.__count__owners');// GET /catalog/{id}/owners/count
    Catalog.disableRemoteMethodByName('prototype.__count__readers');// GET /catalog/{id}/readers/count
    
    // temporarily hide  buggy
    Catalog.disableRemoteMethodByName('prototype.__exists__owners');// HEAD /catalog/{id}/owners/rel/{fk}
    Catalog.disableRemoteMethodByName('prototype.__exists__readers');// HEAD /catalog/{id}/readers/rel/{fk}
  }());
  // endregion
  // #region INSTANCE METHODS
  // endregion
  // region OBSERVERS
  
  Catalog.observe('loaded', function onLoad(ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const loginId = token && token.userId;
    if (ctx.data) {
      let cat = ctx.data;
      cat._meta = {};
      let meta = cat._meta;
      if (loginId) {
        meta.isOwned = false;
        if ({}.hasOwnProperty.call(cat, 'ownerIds')) {
          for (let i = 0; i < cat.ownerIds.length && !meta.isOwned; i++) {
            meta.isOwned = meta.isOwned || '' + loginId === '' + cat.ownerIds[i];
          }
        }
        meta.loginId = loginId;
      }
      const user = Catalog.app.models.user;
      user.find({
        where: {id: {inq: cat.readerIds}},
        fields: {id: true, username: true}
      }, function (err, obj) {
        if (err) return next(err);
        if (obj) {
          meta.userIdMap = arrToMap(obj, 'id');
        }
        return next();
      });
    }
  });
  
  Catalog.observe('access', function enforceUserReadAccess(ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const loginId = token && token.userId;
    ctx.query = ctx.query ? ctx.query : {};
    if (ctx.options && !ctx.options.onCreate) {
      ctx.query.where = ctx.query.where ? ctx.query.where : {};
      ctx.query.where.readerIds = loginId;
    }
    return next();
  });
  
  // endregion
  // region REMOTE HOOKS
  Catalog.beforeRemote('**', function (ctx, unused, next) {
    console.log('in Catalog method:' + ctx.methodString);
    return next();
  });
  
  function hasWriteAccess(ctx, cat, next, applyFn) {
    const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
    const loginId = token && token.userId;
    if (ctx.instance) {
      ctx.instance.owners.exists(loginId, function (err, isOwner) {
        if (err) {
          return next(err);
        } else if (isOwner) {
          applyFn(ctx, cat, next, loginId);
        } else {
          return next(error(403, 'Permission Denied'));
        }
      });
    } else {
      return next(error(404, 'instance not found'));
    }
  }
  
  function onHasWriteAccess(ctx, cat, next, loginId) {
    return next();
  }
  
  Catalog.beforeRemote('create', function onCatalogCreation(ctx, unused, next) {
    console.log('Catalog>beforeRemote>create:onCatalogCreation');
    if (ctx.args && ctx.args.data) {
      let cat = ctx.args.data;
      let orgId = cat.orgId;
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const loginId = token && token.userId;
      const Org = Catalog.app.models.Org;
      Org.find({where: {id: orgId, adminIds: loginId}}, function (err, orgs) {
        if (err) {
          next(err);
        }
        if (orgs && orgs.length === 1) {
          let org = orgs[0];
          cat.orgIdx = org.orgIdx;
          ctx.args.options.onCreate = true;
          Catalog.find({where: {orgIdx: cat.orgIdx, catalogIdx: cat.catalogIdx}},
            ctx.args.options,
            function (err, cats) {
              if (err) {
                return next(err);
              }
              if (cats === null || cats.length === 0) {
                cat.creatorId = loginId;
                cat.ownerIds = [loginId];
                cat.readerIds = [loginId];
                return next();
              } else {
                return next(error('Catalog with same catalogIdx within this org already exists'));
              }
            });
        } else {
          return next(error(404, 'org not found/user not permitted'));
        }
      });
    } else {
      console.log('no data');
      return next();
    }
  });
  
  // endregion
  // region REMOTE HOOKS: OWNERS & READERS
  Catalog.beforeRemote('prototype.__link__owners', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      const uid = ctx.args.fk;
      ctx.instance.readers.exists(uid, function (err, res) {
        if (err) return next(err);
        if (!res) {
          // also grant read access to owner
          ctx.instance.readers.add(uid);
        }
      });
      return next();
    });
  });
  
  Catalog.beforeRemote('prototype.__unlink__owners', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, onHasWriteAccess);
  });
  
  Catalog.beforeRemote('prototype.__link__readers', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, onHasWriteAccess);
  });
  
  Catalog.beforeRemote('prototype.__unlink__readers', function (ctx, cat, next) {
    hasWriteAccess(ctx, cat, next, function (ctx, cat, next, loginId) {
      const uid = ctx.args.fk;
      ctx.instance.owners.exists(uid, function (err, res) {
        if (res) {
          return next(error('Cannot remove read access from an owner'));
        } else {
          return next();
        }
      });
    });
  });
  
  // endregion
  // region REMOTE HOOKS: ENTRIES
  
  Catalog.beforeRemote('prototype.__create__entries', function (ctx, inst, next) {
    hasWriteAccess(ctx, inst, next, onEntryUpsert);
  });
  
  Catalog.beforeRemote('prototype.__updateById__entries', function (ctx, inst, next) {
    hasWriteAccess(ctx, inst, next, onEntryUpsert);
  });
  
  function onEntryUpsert(ctx, unused, next, loginId) {
    if (ctx.instance) {
      let cat = ctx.instance;
      let entryData = ctx.args.data;
      if (entryData === {} || !entryData.title) {
        return next(error('No data provided or title empty.'));
      }
      console.log('WRITE catalog entry to' + cat.orgIdx + '/' + cat.catalogIdx);
      entryData.orgIdx = cat.orgIdx;
      entryData.catalogIdx = cat.catalogIdx;
      return next();
    } else {
      return next(error(404, 'instance not found'));
    }
  }
  
  // endregion
  // region CUSTOM ENDPOINTS (REMOTES)
  Catalog.owned = function owned(options, cb) {
    const token = options && options.accessToken;
    const loginId = token && token.userId;
    Catalog.find({where: {ownerIds: loginId}}, options, function (err, res) {
      if (err) cb(err);
      cb(null, res);
    });
  };
  // endregion
};
