angular.module('app')
  .controller('LandingPageCtrl', [
    '$scope', '$state',
    function ($scope, $state) {
      $scope.goToLogin = function () {
        $state.go('login');
      }
    }
  ]);
