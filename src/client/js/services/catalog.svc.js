app.factory('CatalogSvc', function CatalogSvc(Catalog) {
  return {
    getReadable: function (scope, key) {
      Catalog.find(
        function success(val) {
          console.log(val);
          scope[key]= val;
        },
        function error(er) {  });
    }
  };
});
