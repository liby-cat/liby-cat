angular.module('app')
  .controller('WireframeCtrl', [
    '$scope', '$state', '$stateParams',
    'User',
    function ($scope, $state, $stateParams,
              User) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
      console.log($scope.user);
    }
  ]);
