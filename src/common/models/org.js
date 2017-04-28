'use strict';
var extend = require('extend');
var error = require('../util/error');

module.exports = function(Org) {
  Org.validatesUniquenessOf('orgIdx');

  Org.createOptionsFromRemotingContext = function(ctx) {
    // console.log('Org.createOptionsFromRemotingContext')
    var base = this.base.createOptionsFromRemotingContext(ctx);
    return extend(base, {
      currentUserId: base.accessToken && base.accessToken.userId,
      contextWithin: true
    });
  };

  // #region HIDE UNSUPPORTED API ENDPOINTS
  Org.disableRemoteMethodByName('patchOrCreate');// PATH /org
  Org.disableRemoteMethodByName('replaceOrCreate');// PUT /org
  Org.disableRemoteMethodByName('deleteById');// DELETE /orgs/{id}
  Org.disableRemoteMethodByName('replaceById');// POST /orgs/{id}/replace, PUT /orgs/{id}
  Org.disableRemoteMethodByName('updateAll');// POST /orgs/update
  Org.disableRemoteMethodByName('upsertWithWhere');// POST /orgs/upsertWithWhere
  Org.disableRemoteMethodByName('prototype.patchAttributes');// PATCH
  Org.disableRemoteMethodByName('findOne');// GET /orgs/findOne

  Org.disableRemoteMethodByName('prototype.__create__admins');
  Org.disableRemoteMethodByName('prototype.__delete__admins');
  Org.disableRemoteMethodByName('prototype.__findById__admins');// GET /Org/{id}/admins/{fk}
  Org.disableRemoteMethodByName('prototype.__updateById__admins');
  Org.disableRemoteMethodByName('prototype.__destroyById__admins');

  // hide endpoints that are semantically wrong
  Org.disableRemoteMethodByName('prototype.__count__admins');// GET /orgs/{id}/admins/count
  // temporarily hide  buggy
  Org.disableRemoteMethodByName('prototype.__exists__admins');// HEAD /orgs/{id}/admins/rel/{fk}

  // #region OBSERVERS

  Org.observe('access', function enforceUserAccess(ctx, next) {
    if (ctx.options && ctx.options.contextWithin) {
      console.log('Org>observe>access:enforceUserAccess');
      const token = ctx.options && ctx.options.accessToken;
      const userId = token && token.userId;
      ctx.query = ctx.query ? ctx.query : {};
      ctx.query.where = ctx.query.where ? ctx.query.where : {};
      ctx.query.where.adminIds = userId;
    }
    console.log(ctx.query);
    next();
  });

  // #region REMOTE HOOKS
  Org.beforeRemote('**', function(ctx, unused, next) {
    console.log('in Org method:' + ctx.methodString);
    next();
  });

  Org.beforeRemote('create', function addCreatorAdmin(ctx, unused, next) {
    console.log('Org>beforeRemote>create:addCreatorAdmin');
    if (ctx.args && ctx.args.data) {
      var org = ctx.args.data;
      const token = ctx.args && ctx.args.options && ctx.args.options.accessToken;
      const userId = token && token.userId;
      org.adminIds = [userId];
      next();
    } else {
      console.log('no data');
      next();
    }
  });
};
