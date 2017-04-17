angular.module('app')
  .controller('FrontPageCtrl', [
    '$scope', '$state',
    function ($scope, $state) {
      $scope.goToLogin = function () {
        $state.go('login');
      }
    }
  ]);
