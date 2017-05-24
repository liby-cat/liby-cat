app.controller('SettingsCtrl', [
  '$scope', '$state', '$stateParams', '$mdDialog',
  'User',
  function ($scope, $state, $stateParams, $mdDialog,
            User) {
    $scope.user = $scope.user ? $scope.user : User.getCachedCurrent();
    
    $scope.editNamePrompt = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Edit name')
        .placeholder($scope.user.name ? $scope.user.name : 'Name')
        .initialValue($scope.user.name)
        .targetEvent(ev)
        .ok('Update')
        .cancel('Cancel');
      
      $mdDialog.show(confirm).then(function (result) {
        $scope.user.name = result;
      }, function () {
      });
    };
  }
]);
