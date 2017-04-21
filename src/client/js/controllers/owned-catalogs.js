angular.module('app')
  .controller('OwnedCatalogsCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Catalog',
    function ($scope, $state, $stateParams,
              User, Catalog) {
      Catalog.owned(
        function success(val) {
          console.log(val);
          $scope.ownedCatalogs = val;
        },
        function error(er) {
      
        });
    }
  ]);
