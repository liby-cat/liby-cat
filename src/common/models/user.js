'use strict';
var error = require('../util/error');

module.exports = function(user) {
  user.validatesUniquenessOf('username');
  user.validatesPresenceOf('username');

  user.afterRemote('create', function createDefaultOrg(ctx, usr, next) {
    console.log('user>afterRemote>create:createDefaultOrg');
    user.app.models.Org.create(
      {orgIdx: usr.username, title: usr.username, adminIds: [usr.id]},
      function createUserDefaultOrg(err, obj) {
        if (err) { next(err); }
        if (obj) {
          console.log(obj);
        }
        next();
      });
  });
  
  user.username2id = function (username, options, cb) {
    const token = options && options.accessToken;
    const loginId = token && token.userId;
    user.find(
      {
        fields: {id: true, username: true},
        where: {username: username}
      },
      options,
      function (err, users) {
        if(err){
          cb(err)
        } else{
          if(users.length==1){
            cb(null, users[0])
          } else {
            cb(error(401,'No user found with the username'))
          }
        }
        
      }
    );
  }
};
