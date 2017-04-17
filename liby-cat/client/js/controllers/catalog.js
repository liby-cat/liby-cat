angular.module('app')
  .controller('CatalogCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Catalog',
    '$mdToast',
    function ($scope, $state, $stateParams,
              User, Catalog,
              $mdToast) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
      console.log($scope.user);
      $scope.catalogId = $stateParams.id;
      Catalog.prototype$__get__entries({id:$scope.catalogId},
        function success(val) {
          console.log(val);
          $scope.entries = val;
        },
        function error(er) {
        
        });
    }
  ]);
