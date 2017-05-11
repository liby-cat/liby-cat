app.controller('CatalogCtrl', [
  '$scope', '$state', '$stateParams',
  'User', 'Catalog',
  '$mdToast', '$mdDialog',
  function ($scope, $state, $stateParams,
            User, Catalog,
            $mdToast, $mdDialog) {
    $scope.loggedIn = User.isAuthenticated();
    $scope.user = User.getCachedCurrent();
    console.log($scope.user);
    $scope.catalogId = $stateParams.id;
    $scope.newEntry = {};
    
    Catalog.findById({id: $scope.catalogId},
      function success(val) {
        console.log(val);
        $scope.cat = val;
      },
      function error(er) {
      }
    );
    
    function loadEntries() {
      Catalog.prototype$__get__entries({id: $scope.catalogId},
        function success(val) {
          console.log(val);
          $scope.entries = val;
        },
        function error(er) {
      
        }
      );
    }
    loadEntries();
    
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
    };
    
    $scope.updateEntry = function updateEntry(row) {
      console.log(row);
    };
  
    $scope.showEdit = function ($event, entryId) {
      $mdDialog.show({
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '../../views/catalog-edit-dialog.html',
        locals: {
          cat: $scope.cat
        },
        controller: DialogController
      }).then(function () {
        loadEntries();
        $mdToast.showSimple('Updated one entry');
      },function () {
        $mdToast.showSimple('canceled');
      });
      function DialogController($scope, $mdDialog, Catalog, cat) {
        $scope.entryId = entryId;
        $scope.cat = cat;
        $scope.closeDialog = function () {
          $mdDialog.cancel();
        };
        $scope.update = function () {
          Catalog.prototype$__updateById__entries({id:cat.id, fk:entryId}, $scope.entry,
          function s(val) {
            console.log(val);
          }, function e(er) {
              console.log(er);
            });
          $mdDialog.hide();
        };
        Catalog.prototype$__findById__entries({id: cat.id, fk: entryId},
          function s(val) {
            console.log(val);
            $scope.entry = val;
          }, function e(er) {
            console.log(er);
          })
      }
    }
    
  }
]);
