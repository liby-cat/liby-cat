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
        template: `
        <md-dialog aria-label="List dialog" flex="100" flex-gt-sm="60">
          <md-dialog-content>
            <div layout="column">
              <md-toolbar class="form-header">
                <div class="md-toolbar-tools">
                  <h2 flex>{{cat.catalogIdx}}: Update Entry</h2>
                </div>
              </md-toolbar>
              <md-card-content>
                <form layout="column" name="updateEntryForm" flex layout-padding>
                  <md-input-container flex>
                    <label>Title</label><input type="text" name="title" ng-model="entry.title" required/>
                  </md-input-container>
                  <md-input-container flex>
                    <label>Author</label><input type="text" name="author" ng-model="entry.author"/>
                  </md-input-container>
                  <md-input-container flex>
                    <label>Publisher</label><input type="text" name="publisher" ng-model="entry.publisher"/>
                  </md-input-container>
                  <md-input-container flex>
                    <label>Translator</label><input type="text" name="translator" ng-model="entry.translator"/>
                  </md-input-container>
                  <md-input-container flex>
                    <label>Editor</label><input type="text" name="editor" ng-model="entry.editor"/>
                  </md-input-container>
                </form>
              </md-card-content>
            </div>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button ng-click="closeDialog()">
              <md-icon>cancel</md-icon> cancel
            </md-button>
            <md-button ng-click="update()">
              <md-icon>save</md-icon> save
            </md-button>
          </md-dialog-actions>
        </md-dialog>`,
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
