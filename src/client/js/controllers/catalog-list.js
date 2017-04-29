angular.module('app')
  .controller('CatalogListCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Catalog',
    function($scope, $state, $stateParams,
              User, Catalog) {
      Catalog.find(
        function success(val) {
          console.log(val);
          $scope.readableCatalogs = val;
        },
        function error(er) { });
    }
  ]);
