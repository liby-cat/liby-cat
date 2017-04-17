angular.module('app')
  .controller('FrontPageCtrl', [
    '$scope', '$state', '$mdToast',
    function ($scope, $state, $mdToast ) {
      $scope.goToLogin = function () {
        $state.go('login');
      }
    }
  ]);
