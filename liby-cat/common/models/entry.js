'use strict';

module.exports = function(Entry) {
  Entry.observe('before save', function enforceOrgCatId(ctx, next) {
    console.log('entry.enforceOrgCatId before save');
    if (ctx.instance) {
      var catId = ctx.instance.catalogId;
      Entry.app.models.Catalog.find({where: {id: catId}}, function(err, cats) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          if (Array.isArray(cats) && cats.length === 1) {
            var cat = cats[0];
            ctx.instance.orgIdx = cat.orgIdx;
            ctx.instance.catalogIdx = cat.catalogIdx;
            next();
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
