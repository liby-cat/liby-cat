'use strict';
var extend = require('extend');

function error(msg) {
  var e = new Error();
  e.status = 422;
  e.message = msg;
  return e;
}

module.exports = function (Catalog) {
  Catalog.createOptionsFromRemotingContext = function (ctx) {
    //console.log('Catalog.createOptionsFromRemotingContext')
    var base = this.base.createOptionsFromRemotingContext(ctx);
    return extend(base, {
      currentUserId: base.accessToken && base.accessToken.userId
    });
  };
  
  //#region HIDE UNSUPPORTED API ENDPOINTS
  Catalog.disableRemoteMethodByName('patchOrCreate');//PATH /catalog
  Catalog.disableRemoteMethodByName('replaceOrCreate');//PUT /catalog
  
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
  Catalog.disableRemoteMethodByName('prototype.__count__owners', false);//GET /catalog/{id}/owners/count
  Catalog.disableRemoteMethodByName('prototype.__count__readers', false);//GET /catalog/{id}/readers/count
  
  // temporarily hide  buggy
  Catalog.disableRemoteMethodByName('prototype.__exists__owners', false);//HEAD /catalog/{id}/owners/rel/{fk}
  Catalog.disableRemoteMethodByName('prototype.__exists__readers', false);//HEAD /catalog/{id}/readers/rel/{fk}
  
  
  //#region INSTANCE METHODS

  Catalog.prototype.userCanRead = function userCanRead(userId) {
    console.log(this);
    return this.ownerIds && this.ownerIds[userId] === 1;
  };

  //#region OBSERVERS
  
  Catalog.observe('access', function enforceUserReadAccess(ctx, next) {
    console.log('Catalog>observe>access:enforceUserReadAccess');
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    ctx.query = ctx.query ? ctx.query : {};
    ctx.query.where = ctx.query.where ? ctx.query.where : {};
    ctx.query.where.readerIds = userId;
    next();
  });
  
  Catalog.observe('before save', function enforceUserWriteAccess(ctx, next) {
    console.log('Catalog>observe>access:enforceUserWriteAccess');
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    ctx.query = ctx.query ? ctx.query : {};
    ctx.query.where = ctx.query.where ? ctx.query.where : {};
    ctx.query.where.ownerIds = userId;
    next();
  });

  //#region REMOTE HOOKS

  Catalog.beforeRemote('**', function (ctx, unused, next) {
    console.log('in Catalog method:' + ctx.methodString);
    next();
  });

  Catalog.beforeRemote('create', function onCatalogCreation(ctx, unused, next) {
    console.log('Catalog>beforeRemote>create:onCatalogCreation');
    if (ctx.args && ctx.args.data) {
      var cat = ctx.args.data;
      var orgId = cat.orgId;
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const userId = token && token.userId;
      const Org = Catalog.app.models.Org;
      Org.find({where:{id: orgId, adminIds: userId}}, function (err, orgs) {
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
                cat.ownerIds = [userId];
                cat.readerIds = [userId];
                next();
              } else {
                next(error('Catalog with same catalogIdx withing this org already exists'));
              }
            });
        } else {
          next(error('org not found/user not permitted'))
        }
      });
    } else {
      console.log('no data');
      next();
    }
  });



  //#region OWNERS
  Catalog.beforeRemote('prototype.__link__owners', function (ctx, cat, next) {
    if (ctx.instance && ctx.args && ctx.args.fk) {
      var userId = ctx.args.fk;
      Catalog.app.models.user.exists(userId, function (err, exists) {
        if (err) {
          next(err);
        } else if (exists) {
          ctx.instance.readers.exists(userId, function (err, res) {
            if(!res){
              ctx.instance.readers.add(userId);
            }
          });
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
