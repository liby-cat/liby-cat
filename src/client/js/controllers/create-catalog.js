angular.module('app')
  .controller('CreateCatalogCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Org', 'Catalog',
    function ($scope, $state, $stateParams,
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
            $state.go('owned-catalogs')
          },
          function error(er) {
          
          }
        );
      }
    }
  ]);
