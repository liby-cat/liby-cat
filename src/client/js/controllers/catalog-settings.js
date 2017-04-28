'use strict';

angular.module('app')
  .controller('CatalogSettingsCtrl', [
    '$scope', '$state', '$stateParams',
    'User', 'Catalog',
    '$mdToast',
    function($scope, $state, $stateParams,
              User, Catalog,
              $mdToast) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
      console.log($scope.user);
      $scope.catalogId = $stateParams.id;
      $scope.newOwner = {};
      $scope.newReader = {};

      $scope.titleEditor = {
        updateFn: function updateTitle(newTitle) {
          console.log('Updating...' + newTitle);
        }
      };

      Catalog.findById({id: $scope.catalogId},
        function success(val) {
          $scope.cat = val;
          $scope.titleEditor.headline = $scope.cat.title;
        },
        function error(er) { }
      );

      $scope.addNewOwner = function() {
        let username = $scope.newOwner.username;
        User.username2id({username: username},
          function success(val) {
            let user = val ? val : {};
            Catalog.prototype$__link__owners({id: $scope.catalogId, fk: user.id},
              function success(val) {
                $scope.cat.ownerIds.push(user.id);
                $scope.cat._meta.userIdMap[user.id] = val;
                $mdToast.showSimple('Added ' + username + ' as an owner of ' + $scope.cat.orgIdx + '/' + $scope.cat.catalogIdx);
              }
            );
          }, function error(er) {
            $mdToast.showSimple(er.data.error.message);
          });
        $scope.newOwner = {};
      };

      $scope.addNewReader = function() {
        let username = $scope.newReader.username;
        User.username2id({username: username},
          function success(val) {
            let user = val ? val : {};
            Catalog.prototype$__link__readers({id: $scope.catalogId, fk: user.id},
              function success(val) {
                $scope.cat.readerIds.push(user.id);
                $scope.cat._meta.userIdMap[user.id] = val;
                $mdToast.showSimple('Added ' + username + ' as a reader of ' + $scope.cat.orgIdx + '/' + $scope.cat.catalogIdx);
              }
            );
          }, function error(er) {
            console.log(er);
            $mdToast.showSimple(er.data.error.message);
          });
        $scope.newReader = {};
      };
    }
  ]);
