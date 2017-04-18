angular.module('app')
  .controller('WireframeCtrl', [
    '$scope', '$state', '$stateParams',
    'User',
    function ($scope, $state, $stateParams,
              User) {
      $scope.userText = 'sdsd';
      $scope.etc = 'ho?';
    }
  ]);
