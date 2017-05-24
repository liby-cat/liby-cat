app.controller('SettingsCtrl', [
    '$scope', '$state', '$stateParams',
    'User',
    function($scope, $state, $stateParams,
              User) {
      $scope.user = $scope.user ? $scope.user : User.getCachedCurrent();
    }
  ]);
