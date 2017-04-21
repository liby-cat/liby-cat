angular.module('app')
  .controller('DashboardCtrl', [
    '$scope', '$rootScope', '$state',
    'User', 'Catalog',
    '$mdToast',
    function ($scope, $rootScope, $state,
              User, Catalog,
              $mdToast) {
      Catalog.find(
        function success(val) {
          console.log(val);
          $scope.readableCatalogs = val;
        },
        function error(er) {
        
        });
    }
  ]);
