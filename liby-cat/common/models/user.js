'use strict';

module.exports = function (user) {
  user.validatesUniquenessOf('username');
  user.validatesPresenceOf('username');

  user.afterRemote('create', function createDefaultOrg(ctx, usr, next) {
    console.log('user>afterRemote>create:createDefaultOrg');
    user.app.models.Org.create({orgIdx: usr.username, title: usr.username, adminIds:[usr.id]},
      function createUserDefaultOrg(err, obj) {
        if(err){ next(err);}
        if(obj){
          console.log(obj);
        }
        next();
      });
  })
};
