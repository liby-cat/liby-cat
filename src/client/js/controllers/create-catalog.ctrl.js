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
  
    function isValidFn(val, validatorFn, key, resultFn) {
      let defer = $q.defer();
      if ($scope.newCatalog.org === undefined) {
        defer.reject();
      } else {
        let query = {orgIdx: $scope.newCatalog.org.orgIdx};
        query[key] = val;
        validatorFn(query,
          function s(val) {
            resultFn(val) ? defer.resolve() : defer.reject();
          }, function e() {
            defer.reject();
          });
      }
      return defer.promise;
    }
  
    $scope.orgCatIdx = function (catIdx) {
      return $scope.newCatalog.org.orgIdx+'/'+catIdx;
    };
    
    $scope.isIdxAvailable = function (newCatIdx) {
      return isValidFn(newCatIdx, Catalog.idxAvailable, 'catalogIdx', function (val) {
        return val.available;
      });
    };
  
  
    $scope.orgCatTitle = function (title) {
      return $scope.newCatalog.org.orgIdx + ':' + title;
    };
  
    $scope.isTitleNew = function (title) {
      return isValidFn(title, Catalog.titleExists, 'title', function (val) {
        return !val.exists;
      });
    };
  }
]);
