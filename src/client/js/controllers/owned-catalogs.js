'use strict';

angular.module('app')
  .controller('OwnedCatalogsCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Org', 'Catalog',
    function($scope, $state, $stateParams,
              User, Org, Catalog) {
      Catalog.owned(
        function success(val) {
          console.log(val);
          $scope.ownedCatalogs = val;
        },
        function error(er) { }
      );
    }
  ]);
