angular.module('app')
  .controller('CreateCatalogCtrl', [
    '$scope', '$state', '$stateParams', '$mdToast',
    'User', 'Org', 'Catalog',
    function ($scope, $state, $stateParams, $mdToast,
              User, Org, Catalog) {
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
        Catalog.create($scope.newCatalog,
          function success(val) {
            console.log(val);
            $mdToast.showSimple('Created new catalog:'+val.title+' @'+val.orgIdx+'/'+val.catalogIdx);
            $state.go('owned-catalogs')
          },
          function error(er) {
          
          }
        );
      }
    }
  ]);
