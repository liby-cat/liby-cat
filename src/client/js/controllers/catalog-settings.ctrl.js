app.controller('CatalogSettingsCtrl', [
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
      function error(er) {
      }
    );
    
    $scope.addNewOwner = function () {
      addMember('as owner', 'newOwner', Catalog.prototype$__link__owners, 'ownerIds', 'readerIds');
    };
    
    $scope.addNewReader = function () {
      addMember('a reader', 'newReader', Catalog.prototype$__link__readers, 'readerIds');
    };
    
    function addMember(label, formObjKey, linkUserFn, catUserListKey, cat2ryListKey) {
      let username = $scope[formObjKey].username;
      User.username2id({username: username},
        function success(val) {
          let user = val ? val : {};
          linkUserFn({id: $scope.catalogId, fk: user.id},
            function success(val) {
              $scope.cat[catUserListKey].push(user.id);
              if (cat2ryListKey) {
                $scope.cat[cat2ryListKey].push(user.id);
              }
              $scope.cat._meta.userIdMap[user.id] = val;
              $mdToast.showSimple(
                `Added ${username} as ${label} of ${$scope.cat.orgIdx}/${$scope.cat.catalogIdx}`);
            }
          );
        }, function error(er) {
          console.log(er);
          $mdToast.showSimple(er.data.error.message);
        });
      $scope[formObjKey] = {};
    }
  }
]);
