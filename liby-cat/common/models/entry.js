'use strict';

function validationError(msg) {
  var error = new Error();
  error.status = 422;
  error.message = msg;
  return error;
}

module.exports = function(Entry) {
  Entry.observe('before save', function enforceOrgCatId(ctx, next) {
    var Catalog = Entry.app.models.Catalog;
    console.log('entry.enforceOrgCatId before save');
    if (ctx.instance) {
      var catId = ctx.instance.catalogId;
      Catalog.find({where: {id: catId}}, function(err, cats) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          if (Array.isArray(cats) && cats.length === 1) {
            var cat = cats[0];
            ctx.instance.orgIdx = cat.orgIdx;
            ctx.instance.catalogIdx = cat.catalogIdx;
            const token = ctx.options && ctx.options.accessToken;
            const userId = token && token.userId;
            cat.__exists__owners(userId, function (err, res) {
              if(err){
                next(err)
              } else if(res){
                console.log('User:'+userId+' can add to catalog:'+ catId+ '; saving new entry.');
                next();
              } else {
                console.log('User:'+userId+' not authorized on catalog:'+ catId+'.');
                next(validationError('User is not an owner of this catalog'));
              }
            });
          } else {
            next(validationError('Catalog not found with id:' + catId));
          }
        }
      });
    } else {
      next(validationError('instance not found'));
    }
  });
};
