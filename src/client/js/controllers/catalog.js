'use strict';

angular.module('app')
  .controller('CatalogCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Catalog',
    '$mdToast',
    function ($scope, $state, $stateParams,
              User, Catalog,
              $mdToast) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
      console.log($scope.user);
      $scope.catalogId = $stateParams.id;
      $scope.newEntry = {};
      
      
      Catalog.prototype$__get__entries({id: $scope.catalogId},
        function success(val) {
          console.log(val);
          $scope.entries = val;
        },
        function error(er) {
        
        }
      );
      
      $scope.addNewEntry = function addNewEntry() {
        console.log($scope.newEntry);
        Catalog.prototype$__create__entries({id: $scope.catalogId}, $scope.newEntry,
          function success(val) {
            console.log(val);
            $scope.entries.push(val);
          }, function error(er) {
            console.log(er);
          }
        );
        $scope.newEntry = {};
        $scope.newEntryForm.title.$touched = false;
      }
    }
  ]);
