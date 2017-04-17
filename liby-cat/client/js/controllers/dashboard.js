angular.module('app')
  .controller('DashboardCtrl', [
    '$scope', '$rootScope', '$state',
    'User', 'Catalog',
    '$mdToast',
    function ($scope, $rootScope, $state,
              User, Catalog,
              $mdToast) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
      console.log($scope.user);
      Catalog.find(
        function success(val) {
          console.log(val);
          $scope.catalogs = val;
        },
        function error(er) {
        
        });
    }
  ]);
