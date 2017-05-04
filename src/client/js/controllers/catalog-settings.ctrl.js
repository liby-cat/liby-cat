app.controller('CatalogSettingsCtrl', [
  '$scope', '$state', '$stateParams',
  'User', 'Catalog',
  '$mdToast',
  function ($scope, $state, $stateParams,
            User, Catalog,
            $mdToast) {
    $scope.loggedIn = User.isAuthenticated();
    $scope.user = User.getCachedCurrent();
    $scope.catalogId = $stateParams.id;
    $scope.owners = [];
    $scope.readers = [];
    
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
      function error(er) {
      }
    );
    
    function addUserHandler(chip, relationKey, label, addHandler) {
      let username = chip;
      let user;
      User.username2id({username: username},
        function success(val) {
          user = val ? val : {};
          Catalog[relationKey].link({id: $scope.catalogId, fk: user.id},
            function success(val) {
              addHandler(user.id);
              $scope.cat._meta.userIdMap[user.id] = val;
              $mdToast.showSimple(
                `Added ${username} as as ${label} of ${$scope.cat.orgIdx}/${$scope.cat.catalogIdx}`);
            }, function e(er) {
              $mdToast.showSimple(er.data.error.message);
            }
          );
        }, function error(er) {
          $mdToast.showSimple(er.data.error.message);
        });
      return null;
    }
    
    $scope.addOwner = function (chip) {
      return addUserHandler(chip, 'owners', 'owner', function (userId) {
        $scope.cat.ownerIds.push(userId);
        if ($.inArray(userId, $scope.cat.readerIds) === -1) {
          $scope.cat.readerIds.push(userId);
        }
      });
    };
    
    $scope.addReader = function (chip) {
      return addUserHandler(chip, 'readers', 'reader', function (userId) {
        $scope.cat.readerIds.push(userId);
      });
    };
    
    function removeUserHandler(userId, relationKey, label, rejectHandler) {
      Catalog[relationKey].unlink({id: $scope.catalogId, fk: userId}, function s(val) {
        let user = $scope.cat._meta.userIdMap[userId];
        $mdToast.showSimple(
          `Removed ${user.username} from being ${label} of ${$scope.cat.orgIdx}/${$scope.cat.catalogIdx}`);
      }, function e(err) {
        $mdToast.showSimple(err.data.error.message);
        rejectHandler(userId);
      });
    }
    
    $scope.removeOwner = function (userId) {
      return removeUserHandler(userId, 'owners', 'an owner', function (userId) {
        $scope.cat.ownerIds.push(userId);
      })
    };
    
    $scope.removeReader= function (userId) {
      return removeUserHandler(userId, 'readers', 'a reader', function (userId) {
        $scope.cat.readerIds.push(userId);
      })
    };
  }
]);
