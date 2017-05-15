app.controller('CreateCatalogCtrl', [
  '$scope', '$state', '$stateParams', '$mdToast',
  'User', 'Org', 'Catalog', '$q',
  function ($scope, $state, $stateParams, $mdToast,
            User, Org, Catalog, $q) {
    $scope.newCatalog = {};
    Org.find(
      function success(val) {
        console.log(val);
        $scope.orgs = val;
      },
      function error(er) {
      
      }
    );
    
    $scope.createNewCatalog = function createNewCatalog() {
      let newCat = $scope.newCatalog;
      newCat.orgId = $scope.newCatalog.org.id;
      Catalog.create(newCat,
        function success(val) {
          console.log(val);
          $mdToast.showSimple('Created new catalog:' + val.title + ' @' + val.orgIdx + '/' + val.catalogIdx);
          $state.go('owned-catalogs');
        },
        function error(er) {
          $mdToast.showSimple(er.data.error.message);
        }
      );
    };
    
    $scope.isCatalogIdxAvailable = function (newCatIdx) {
      let defer = $q.defer();
      console.log($scope.newCatalog);
      Catalog.idxAvailable({orgIdx: $scope.newCatalog.org.orgIdx, catalogIdx: newCatIdx},
        function s(val) {
          val.available ? defer.resolve() : defer.reject();
        }, function e() {
          defer.reject();
        });
      return defer.promise;
    };
  }
]);
