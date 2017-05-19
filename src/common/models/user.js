const error = require('../util/error');
const util = require('../util/util');
const path = require('path');

module.exports = function (user) {
  user.validatesUniquenessOf('username');
  user.validatesPresenceOf('username');
  
  user.beforeRemote('create', function beforeCreateNewUser(ctx, usr, next) {
    "use strict";
    let reCaptcha = ctx.args.data.reCaptcha;
    util.verifyReCaptcha(reCaptcha,
      function success() {
        delete ctx.args.data.reCaptcha;
        return next();
      }, function failed() {
        delete ctx.args.data.reCaptcha;
        return next(error('Cannot validate reCaptcha'));
      }, function (err) {
        delete ctx.args.data.reCaptcha;
        return next(err);
      });
  });
  
  user.afterRemote('create', function afterCreateNewUser(ctx, usr, next) {
    console.log('user>afterRemote>create:createDefaultOrg');
    
    let options = {
      type: 'email',
      to: usr.email,
      from: 'noreply@liby.cat',
      subject: 'Liby.cat: Please verify you email address.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/login',
      user: usr,
      host: user.app.get('displayName'),
      port: user.app.get('displayPort'),
      protocol: user.app.get('displayProtocol')
    };
  
    usr.verify(options, function (err, response) {
      if (err) {
        user.deleteById(usr.id);
        return next(err);
      }
      console.log('> verification email sent:', response);
      user.app.models.Org.create(
        {orgIdx: usr.username, title: usr.username, adminIds: [usr.id]},
        function createUserDefaultOrg(err, obj) {
          if (err) {
            next(err);
          }
          if (obj) {
            console.log(obj);
          }
          return next();
        });
    });
  });
  
  //send password reset link when requested
  user.on('resetPasswordRequest', function(info) {
    let url = 'http://localhost:3000/reset-password';
    let html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';
    
    User.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
  
  user.usernameAvailable = function (username, options, cb) {
    user.find(
      {
        fields: {username: true},
        where: {username: username}
      },
      options,
      function (err, users) {
        setTimeout(function () {
          if (err) {
            cb(err);
          } else {
            if (!users || users.length === 0) {
              cb(null, true);
            } else {
              cb(null, false);
            }
          }
        }, 500);
        //
      }
    );
  };
  
  user.username2id = function (username, options, cb) {
    const token = options && options.accessToken;
    user.find(
      {
        fields: {id: true, username: true},
        where: {username: username}
      },
      options,
      function (err, users) {
        if (err) {
          cb(err);
        } else {
          if (users.length === 1) {
            cb(null, users[0]);
          } else {
            cb(error(404, 'No user found with the username: ' + username));
          }
        }
      }
    );
  };
};
