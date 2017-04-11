'use strict';

module.exports = function (Org) {
  Org.validatesUniquenessOf('orgIdx');
  
  //#region HIDE UNSUPPORTED API ENDPOINTS
  Org.disableRemoteMethodByName('patchOrCreate', false);//PATH /org
  Org.disableRemoteMethodByName('replaceOrCreate', false);//PUT /org
  Org.disableRemoteMethodByName('deleteById', false);//DELETE /orgs/{id}
  Org.disableRemoteMethodByName('replaceById', false);//POST /orgs/{id}/replace
  Org.disableRemoteMethodByName('updateAll', false);//POST /orgs/{id}/replace, PUT /orgs/{id}
  Org.disableRemoteMethodByName('upsertWithWhere', false);//POST /orgs/update
  Org.disableRemoteMethodByName('prototype.patchAttributes', false);//POST /orgs/upsertWithWhere
  
  Org.disableRemoteMethodByName('prototype.__create__admins', false);
  Org.disableRemoteMethodByName('prototype.__delete__admins', false);
  Org.disableRemoteMethodByName('prototype.__findById__admins', false);//GET /Org/{id}/admins/{fk}
  Org.disableRemoteMethodByName('prototype.__updateById__admins', false);
  Org.disableRemoteMethodByName('prototype.__destroyById__admins', false);
  
  //#region OBSERVERS
  
  Org.observe('access', function enforceUserAccess(ctx, next) {
    console.log('Org>observe>access:enforceUserAccess');
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    ctx.query = ctx.query ? ctx.query : {};
    ctx.query.where = ctx.query.where ? ctx.query.where : {};
    ctx.query.where.adminIds = userId;
    next();
  });
  
  //#region REMOTE HOOKS
  Org.beforeRemote('**', function (ctx, unused, next) {
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
