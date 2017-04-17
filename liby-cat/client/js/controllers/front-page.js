angular.module('app')
  .controller('FrontPageCtrl', [
    '$scope', '$state', '$mdToast',
    function ($scope, $state, $mdToast ) {
      $scope.goToLogin = function () {
        $mdToast.showSimple('Taking you to sign in page');
        $state.go('login');
      }
    }
  ]);
