app.controller('LoginCtrl', [
  '$scope', '$rootScope', '$state', 'User', '$mdToast',
  function ($scope, $rootScope, $state, User, $mdToast) {
    $scope.userCred = {};
    $scope.submit = function () {
      let cred = {password: $scope.userCred.password};
      if (validateEmail($scope.userCred.login)) {
        cred.email = $scope.userCred.login;
      } else {
        cred.username = $scope.userCred.login;
      }
      
      User.login(cred,
        function success(value, res) {
          let username = value.user.username;
          $mdToast.showSimple('Successfully signed in: ' + username);
          $rootScope.user = value.user;
          $state.go('dashboard');
        },
        function error(er) {
          $mdToast.showSimple('Invalid credentials');
          User.logout();
        });
    }
    
  }]);
